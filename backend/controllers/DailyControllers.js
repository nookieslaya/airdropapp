import Daily from "../models/daily.js";


const CreateDaily = async (req,res)=>{
    try{
        const name = req.body.name
        const url = req.body.url
        const description= req.body.description

        const daily = await Daily.create({
            name:name,
            url:url,
            description:description,
            user:req.user._id
        })

        res.json({daily: daily})

    }catch (err) {
        console.log(err)
    }
}


const GetDaily = async (req,res) =>{
    try {
        const daily = await Daily.find({ user:req.user._id})
        res.json({ daily });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

const GetSingleDaily = async (req,res) =>{
    try {
        const dailyId = req.params.id
        const daily = await Daily.findOne([{_Id:dailyId, user:req.user._id}])
        res.json({daily:daily})
    }catch (err) {
        console.log(err)
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

const UpdateDaily = async (req,res) =>{
    try {
        const dailyId = req.params.id
        const {name, url,description} = req.body
        await Daily.findOneAndUpdate({_id: dailyId, user:req.user._id},{name, url, description})
        const daily= await Daily.findById(dailyId)
        res.json({ daily});
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Server error' });
    }
}
const DeleteDaily = async (req,res)=>{
    try {
        const dailyId = req.params.id;
        await Daily.findOneAndDelete({ _id: dailyId, user: req.user._id });
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

export {CreateDaily, GetDaily, GetSingleDaily,UpdateDaily,DeleteDaily}