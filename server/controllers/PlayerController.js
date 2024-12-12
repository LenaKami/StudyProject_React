const PlayerYT = require("../database/models/Player");
const User = require("../database/models/Player");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

module.exports = {
    async addPlayerYT(req, res) {
        const { linkyt, category} = req.body;
        const like = [];
        const unlike = [];
        const countlike = 0;
        const countunlike = 0

        try {
            const existingLink = await PlayerYT.findOne({ linkyt });
            if (existingLink) {
                return res.status(400).json({
                    status: 400,
                    message: "Player already exists",
                });
            }

            const player = new PlayerYT({
                linkyt,
                category,
                like,
                unlike,
                countlike,
                countunlike
            });

            await player.save();

            res.status(200).json({
                status: 200,
                message: "Player added successfully",
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },

    async updatePlayerYT(req, res) {
        const { id } = req.params;
        const { linkyt, category } = req.body;

        try {
            const updatedPlayer = await PlayerYT.findByIdAndUpdate(
                id,
                { linkyt, category },
                { new: true, runValidators: true }
            );

            if (!updatedPlayer) {
                return res.status(404).json({
                    status: 404,
                    message: "Player not found",
                });
            }

            res.status(200).json({
                status: 200,
                message: "Player updated successfully",
                data: updatedPlayer
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },



    async deletePlayerYT(req, res) {
        const { id } = req.params;

        try {
            const deletedPlayer = await PlayerYT.findByIdAndDelete(id);
            if (!deletedPlayer) {
                return res.status(404).json({
                    status: 404,
                    message: "Player not found",
                });
            }

            res.status(200).json({
                status: 200,
                message: "Player deleted successfully",
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },

    async getAllPlayersYT(req, res) {
        try {
            const players = await PlayerYT.find();
            res.status(200).json({
                status: 200,
                data: players,
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },

    async getPlayerYT(req, res) {
        const { id } = req.params;
        try {
            const player = await PlayerYT.findById( id );
            if (!player) {
                return res.status(404).json({
                    status: 404,
                    message: "Player not found",
                });
            }
            res.status(200).json({
                status: 200,
                data: player,
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },

    async likePlayerYT(req, res) {
        const { id } = req.params;
        const { username } = req.body;
    
        try {
            const likePlayer = await PlayerYT.findById(id);
    
            if (!likePlayer) {
                return res.status(404).json({
                    status: 404,
                    message: "Player not found",
                });
            }
            if (username) {
                if (!likePlayer.like.includes(username)){
                likePlayer.like.push(username);
                }
                else{
                    likePlayer.like.pop(username);
                }
                if(likePlayer.unlike.includes(username)){
                    likePlayer.unlike.pop(username);
                }
            }
            likePlayer.countlike = likePlayer.like.length
            likePlayer.countunlike = likePlayer.unlike.length
            console.log("co oglądamy?")
            const updatedPlayer = await likePlayer.save();
    
            res.status(200).json({
                status: 200,
                message: "Player is liked successfully",
                data: updatedPlayer
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message,
            });
        }
    },

    async unlikePlayerYT(req, res) {
        const { id } = req.params;
        const { username } = req.body;
    
        try {
            const unlikePlayer = await PlayerYT.findById(id);
    
            if (!unlikePlayer) {
                return res.status(404).json({
                    status: 404,
                    message: "Player not found",
                });
            }
            if (username) {
                if (!unlikePlayer.unlike.includes(username)){
                    unlikePlayer.unlike.push(username);}
                else
                {
                    unlikePlayer.unlike.pop(username)
                }
                if(unlikePlayer.like.includes(username)){
                    unlikePlayer.like.pop(username);
                }
            }
            unlikePlayer.countlike = unlikePlayer.like.length
            unlikePlayer.countunlike = unlikePlayer.unlike.length
            console.log("co oglądamy?")
            const updatedPlayer = await unlikePlayer.save();
    
            res.status(200).json({
                status: 200,
                message: "Player is disliked successfully",
                data: updatedPlayer
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message,
            });
        }
    }
};
