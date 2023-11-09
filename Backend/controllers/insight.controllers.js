const axios = require('axios');
const cheerio = require('cheerio');
const { InsightModel } = require('../models/insight.model');

async function getWordCountAndMediaFromURL(url) {
    try {
        let formattedURL = url;
        if (!url.startsWith('https://')) {
            formattedURL = 'https://' + url; 
        }
        const response = await axios.get(formattedURL);
        const html = response.data;

        const $ = cheerio.load(html);

        const text = $('body').text();
        
        const words = text.split(/\s+/).filter(word => word.length > 0);

        const wordCount = words.length;

        const imageDetails = [];
        $('img').each((index, element) => {
            const imageURL = $(element).attr('src');
            imageDetails.push(imageURL);
        });

        const videoDetails = [];
        $('video').each((index, element) => {
            const videoURL = $(element).attr('src');
            videoDetails.push(videoURL);
        });

        const weblinksDetails = [];
        $('a').each((index, element) => {
            const anchorLink = $(element).attr('href');
            weblinksDetails.push(anchorLink);
        });
        
        return { wordCount, images: imageDetails, videos:videoDetails , weblinks : weblinksDetails };
    } catch (error) {
        console.error('Error fetching website content:', error);
        throw error;
    }
}

const addInsighttoDb = async(req,res)=>{
    try {
        const { url } = req.body;
        const urldata = await getWordCountAndMediaFromURL(url);

        const newInsightDetails = new InsightModel({
            url:url,
            wordCount:urldata.wordCount,
            images:urldata.images,
            videos:urldata.videos,
            weblinks:urldata.weblinks,
            user:req.body.userId
        })
        await newInsightDetails.save();
        
        res.status(200).send(urldata)
    } catch (error) {
        console.log('/insight/: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


const getAllInsight = async(req,res)=>{
    try {
        const { favorite } = req.query;
        const filter = favorite === "true" ? { favorite: true } : favorite === "false" ? { favorite: false } : {};

        const allInsight = await InsightModel.find({user:req.body.userId,...filter}).sort({ createdAt: -1 });

        res.status(200).send(allInsight)
    } catch (error) {
        console.log('/insight/getallinsight: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}


const addToFav = async(req,res)=>{
    try {
        const { insightId } = req.params;
        const payload = req.body;
        await InsightModel.findByIdAndUpdate({ _id: insightId }, payload);
        res.status(200).send({msg:"Details Updated"})
    } catch (error) {
        console.log('/insight/addtofav/:insightId: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}

const deleteInsight = async(req,res)=>{
    try {
        const { insightId } = req.params;
        await InsightModel.findByIdAndDelete({ _id: insightId });
        res.status(200).send({msg:"Insight Deleted Sucessfully"})
    } catch (error) {
        console.log('/insight/delete/:insightIdd: ', error.message);
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
}
module.exports={
    addInsighttoDb,
    getAllInsight,
    addToFav,
    deleteInsight
}