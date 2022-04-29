const Habit = require('../models/Habit');
const jwt = require('jsonwebtoken');
const { json } = require('express');

async function getAllHabits(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const habitsData = await Habit.getAllHabits(decodedToken.id, req.params.id);
        res.render('habitPage', habitsData);
    } catch (err) {
        console.log(err)
        res.status(404).json({ err })
    }
}

async function createHabit(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const result = await Habit.create(decodedToken.id, req.params.id ,req.body);
        res.status(201).send("All good");
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function updateHabit(req, res) {
    try {
        const decodedToken = jwt.decode(req.headers['cookie'].split('=')[1]);
        const result = await Habit.updateHabit(decodedToken.id, req.params.id, req.body);
        res.status(201).json(result);
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

async function deleteHabit(req, res) {
    try {
        const result = await Habit.delete(req.body, req.params.id);
        res.status(201).send('Deleted');
    } catch (err) {
        console.log(err)
        res.status(422).json({ err })
    }
}

module.exports = {createHabit, deleteHabit, getAllHabits, updateHabit}