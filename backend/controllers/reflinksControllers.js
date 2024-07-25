import Reflinks from "../models/reflinks.js";


const CreateReflinks = async (req,res)=>{
    try{
        const name = req.body.name
        const url = req.body.url

        const reflink = await Reflinks.create({
            name: name,
            url: url,
            user: req.user._id
        })
        res.json({reflink:reflink})
    }catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

const GetReflinks = async (req, res)=>{
    try{
        const reflinks = await Reflinks.find({user: req.user._id})
        res.json({reflinks})
    }catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}
const GetSingleReflinks = async (req,res)=>{
    try{
        const reflinkId = req.params.id;
        const reflink = await Reflinks.findOne([{ _id: reflinkId, user: req.user._id }]);
        res.json({ reflink });
    }catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

const UpdateReflinks = async (req,res)=> {
    try {
        const reflinkId = req.params.id;
        const {name, url} = req.body;

        await Reflinks.findOneAndUpdate({_id: reflinkId, user: req.user._id}, {name, url});
        const reflink = await Reflinks.findById(reflinkId)
        res.json({reflink});
    } catch (err) {
        console.error(err);
        res.status(400).json({error: 'Server error'});
    }
}

const DeleteReflinks = async (req,res)=>{
    try{
        const reflinkId = req.params.id;
        await Reflinks.findOneAndDelete({ _id: reflinkId, user: req.user._id });
        res.json({ success: true });
    }catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

export {CreateReflinks, GetReflinks, GetSingleReflinks, UpdateReflinks, DeleteReflinks}