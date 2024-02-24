import asyncHandler from 'express-async-handler';
import { nanoid } from 'nanoid'
import Link from '../models/Link.js';


export const createShortLink = asyncHandler(async (req, res) => {
    const { url } = req.body;
    if(!url){
        return res.status(400).json({ message: "Url is required" });
    }

    const id = nanoid(8);
    if(!id) {
        return res.status(500).json({ message: "Something went wrong" });
    }

    const result = await Link.create({ shortId: id, originalUrl: url });

    if(result){
        res.status(201).json({ message: "Short Link Created", link: result });
    }else {
        res.status(500).json({ message: "Something went wrong" });
    }

})


export const redirectToOriginal = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({ message: "Id is required" });
    }

    const link = await Link.findOne({ shortId: id });

    if(!link){
        return res.status(404).json({ message: "Url does not exist" });
    }

    res.redirect(link.originalUrl);
})