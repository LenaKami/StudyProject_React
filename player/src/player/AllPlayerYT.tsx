import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Text } from '../ui';
import {WaNavLink} from '../onkrzyczy'
import {AddWaNavLink} from '../onkrzycz2'
import { routes } from "../routes";
import { useAuthContext } from "../Auth/AuthContext";
import {HandThumbUpIcon, HandThumbDownIcon} from '@heroicons/react/24/solid'

type PlayerYT = {
  _id: string,
  linkyt: string,
  category: string,
  like: [string],
  unlike: [string],
  countlike: number,
  countunlike: number
}


export const AllPlayerYT = () => {

  const [players, setPlayers] = useState<PlayerYT[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn,username,isAdmin } = useAuthContext();

  useEffect(() => {fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const playerYTResponse = await fetch('http://localhost:8080/player/allPlayers');
      const playerYTData = await playerYTResponse.json();
      setPlayers(playerYTData.data);
      console.log(playerYTData.data)
      console.log(players)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  if (loading) {
      return <div>Loading...</div>;
    }


    /*const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    };*/

    const handleOnClickLike = async (like:string, id:string) => {
        try {
          const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('JWT token not found in localStorage');
            }
          const response = await fetch(`http://localhost:8080/player/${like}/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username' : username}),
          });
          const dataa = await response.json();
          console.log(dataa.data)
          if (response.ok) {
            setMessage(`Success: ${dataa.message}`);
            fetchData()
          } else {
            setMessage(`Error: ${dataa.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
          //setMessage(`Error: ${error.message}`);
        }
    };

    const filteredPlayers = selectedCategory
      ? players.filter(player => player.category === selectedCategory)
      : players;

      /*const handleOnClick = async (event) => {
        console.log(event.target.name);
        try {
          const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('JWT token not found in localStorage');
            }
          const response = await fetch(`http://localhost:8080/player/delete/${event.target.name}`, {
            method: 'GET',
            headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json',
            },
          });
          const dataa = await response.json();
          if (response.ok) {
            setMessage(`Success: ${dataa.message}`);
            setPlayers(players.filter(player => player._id !== event.target.name));
          } else {
            setMessage(`Error: ${dataa.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage(`Error: ${error.message}`);
        }
      };*/


      /*const handleOnClickUpdate1 = (id) => {
        const token = localStorage.getItem('jwtToken');
            if (!token) {
                throw new Error('JWT token not found in localStorage');
            }
        navigate(`/update/${id}`);
      };*/


    return (
        <div>
          <div className="button-container">
          <button className="custom-button focus:outline-none focus:ring-4 focus:ring-blue-100" /*onClick={() => handleCategoryClick('POP')}*/>POP</button>
          <button className="custom-button focus:outline-none focus:ring-4 focus:ring-blue-100" /*onClick={() => handleCategoryClick('RAP')}*/>RAP</button>
          <button className="custom-button focus:outline-none focus:ring-4 focus:ring-blue-100" /*onClick={() => handleCategoryClick('INDIE')}*/>INDIE</button>
          <button className="custom-button focus:outline-none focus:ring-4 focus:ring-blue-100" /*onClick={() => handleCategoryClick('METAL')}*/>METAL</button>
          <button className="custom-button focus:outline-none focus:ring-4 focus:ring-blue-100" /*onClick={() => handleCategoryClick('ROCK')}*/>ROCK</button>
          <button className="custom-button focus:outline-none focus:ring-4 focus:ring-blue-100" /*onClick={() => handleCategoryClick('')}*/>All</button>
          {isAdmin ? (<><AddWaNavLink to={routes.ADDPLAYER.path} className="custom-button text-white hover:text-white bg-green-900 hover:bg-green-700">Add</AddWaNavLink></>):(<></>)}
          </div>
          <div className="player-grid">
            {filteredPlayers.map((player, index) => (
              <div className="player-wrapper">
              <div key={index}>
                <ReactPlayer
                  className="react-player"
                  url={player.linkyt}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
              {/* {isAdmin ? (<>
              <button onClick={() => handleOnClickUpdate1(player._id)} className='h-10 w-30 bg-green-500 hover:bg-green-300 mr-2'>Update</button>
              <button name={player._id} onClick={handleOnClick}  className='h-10 w-30 bg-red-400 hover:bg-red-200'>Delete</button></>):(<></>)} */}
              {isLoggedIn && !isAdmin ? (<div className="flex items-center justify-center space-x-4">
              <button onClick={() => handleOnClickLike('Like',player._id)} className='h-10 w-30 bg-blue-400 hover:bg-blue-200 like-unlike-buttons'><HandThumbUpIcon className="h-4 w-6 text-white cursor-pointer"/>Like {player.countlike}</button>
              <button onClick={() => handleOnClickLike('Unlike',player._id)} className='h-10 w-30 bg-red-400 hover:bg-red-200 like-unlike-buttons'> <HandThumbDownIcon className="h-4 w-6 text-white cursor-pointer"/> Dislike {player.countunlike} </button></div>):(<></>)}
              </div>
            ))}
          </div>
          {message && <p className="dark: text-green-200">{message} </p>}
        </div>
      );
  }