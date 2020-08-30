const mongoose = require('mongoose')
const Mention = mongoose.model('Mention')

exports.listMentions = async (req, res) => {
    try {
        const data = await Mention.find({})
        res.status(200).send(data)
    }
    catch (e) {
        res.status(500).send({
            message: `Failed to list mentions: ${e}`
        })
    }
}

exports.createMention = async (req, res) => {
    try {
        const mention = new Mention({
            author: req.body.author,
            mention: req.body.mention
        })

        await mention.save()

        res.status(201).send({
            message: 'Mention added successfully'
        })
    }
    catch (e) {
        res.status(500).send({
            message: `Failed to create mention: ${e}`
        })
    }
}