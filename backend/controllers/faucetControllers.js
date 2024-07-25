import Faucet from "../models/faucet.js";

const CreateFaucet = async (req, res)=>{
try {
    const name = req.body.name
    const url = req.body.url

    const faucet =  await Faucet.create({
        name: name,
        url: url,
        user: req.user._id
    })

    res.json({faucet:faucet})
}catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Server error' });
}
}

const GetFaucet = async (req, res)=>{
try{
    const faucets = await Faucet.find({user: req.user._id})
    res.json({faucets})
}catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Server error' });
}
}
const GetSingleFaucet = async (req,res)=>{
    try{
        const faucetId = req.params.id;
        const faucet = await Faucet.findOne([{ _id: faucetId, user: req.user._id }]);
        res.json({ faucet });
    }catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Server error' });
    }
}

const UpdateFaucet = async (req,res)=>{
  try{
      const faucetId = req.params.id;
      const { name, url } = req.body;

      await Faucet.findOneAndUpdate({ _id: faucetId, user: req.user._id }, { name, url } );

      const faucet = await Faucet.findById(faucetId)
      res.json({ faucet });
  }catch (e) {
      console.error(err);
      res.status(400).json({ error: 'Server error' });
  }
}

const DeleteFaucet = async (req,res)=>{
try{
    const faucetId = req.params.id;
    await Faucet.findOneAndDelete({ _id: faucetId, user: req.user._id });
    res.json({ success: true });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
}
}

export { CreateFaucet, GetFaucet,GetSingleFaucet,UpdateFaucet,DeleteFaucet}