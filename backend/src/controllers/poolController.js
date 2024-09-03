const axios = require('axios');
const Pool = require('../models/Pool');

const createPool = async (req, res) => {
    const { leagueId, betAmount } = req.body;

    try {
        // Create a new pool in your database
        const newPool = await Pool.create({
            leagueId,
            betAmount,
        });

        // Fetch the matchups from Sleeper API
        const matchups = await getMatchups(leagueId);

        if (!matchups) {
            return res.status(404).json({ msg: 'No matchups found for this league.' });
        }

        // Fetch the users/teams from Sleeper API
        const teams = await getTeams(leagueId);

        if (!teams) {
            return res.status(404).json({ msg: 'No teams found for this league.' });
        }

        // Map roster_id to team names
        const matchupResults = matchups.map((matchup) => {
            const team1 = teams.find(team => team.roster_id === matchup.roster_id);
            const team2 = teams.find(team => team.roster_id !== matchup.roster_id && team.matchup_id === matchup.matchup_id);

            return {
                matchup_id: matchup.matchup_id,
                team1: team1 ? team1.team_name : 'Unknown Team 1',
                team2: team2 ? team2.team_name : 'Unknown Team 2',
            };
        });

        // Send response with the newly created pool and matchups data
        res.json({ newPool, matchups: matchupResults });

    } catch (error) {
        console.error('Error creating pool or fetching data:', error);
        res.status(500).send('Server error');
    }
};

// Function to get matchups from Sleeper API
const getMatchups = async (leagueId) => {
    try {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/matchups/1`); // assuming week 1 for now
        return response.data;
    } catch (error) {
        console.error('Error fetching matchups from Sleeper API:', error);
        return null;
    }
};

// Function to get teams from Sleeper API
const getTeams = async (leagueId) => {
    try {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/users`);
        return response.data.map(user => ({
            roster_id: user.roster_id,
            team_name: user.metadata.team_name || user.display_name, // Fallback to display_name if team_name is not present
        }));
    } catch (error) {
        console.error('Error fetching teams from Sleeper API:', error);
        return null;
    }
};

module.exports = { createPool };








