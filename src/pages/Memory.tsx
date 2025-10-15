import { useState, useEffect } from "react";
import { GiPodiumWinner } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import MemoryCard from '../components/MemoryCard';
import avocado from '../assets/avocado.png';
import bee from '../assets/bee.png';
import coffee from '../assets/coffee.png';
import game from '../assets/game.png';
import guitar from '../assets/guitar.png';
import kareoke from '../assets/kareoke.png';
import pizza from '../assets/pizza.png';
import present from '../assets/present.png';
import {Button} from '../components/ui/button';
import { ArrowLeft } from "lucide-react";




function Memory(){

  const [items, setItems] = useState([
    {id: 1, img: avocado, stat: ""},
    {id: 1, img: avocado, stat: ""},
    {id: 2, img: bee, stat: ""},
    {id: 2, img: bee, stat: ""},
    {id: 3, img: coffee, stat: ""},
    {id: 3, img: coffee, stat: ""},
    {id: 4, img: game, stat: ""},
    {id: 4, img: game, stat: ""},
    {id: 5, img: guitar, stat: ""},
    {id: 5, img: guitar, stat: ""},
    {id: 6, img: kareoke, stat: ""},
    {id: 6, img: kareoke, stat: ""},
    {id: 7, img: pizza, stat: ""},
    {id: 7, img: pizza, stat: ""},
    {id: 8, img: present, stat: ""},
    {id: 8, img: present, stat: ""},
  ].sort(() => Math.random() - 0.5));

  const [prev, setPrev] = useState(-1);
  const [disabled, setDisabled] = useState(false);
  const [endMessage, setEndMessage] = useState("");

  useEffect(() => {
  const revealedItems = items.map(item => ({ ...item, stat: "active" }));
  setItems(revealedItems);

  const timeout = setTimeout(() => {
    const hiddenItems = revealedItems.map(item => ({ ...item, stat: "" }));
    setItems(hiddenItems);
      }, 2000);

      return () => clearTimeout(timeout);
    }, []);


function check(current: number) {
  const newItems = [...items];

  if (newItems[current].id === newItems[prev].id) {
    newItems[current] = { ...newItems[current], stat: "correct" };
    newItems[prev] = { ...newItems[prev], stat: "correct" };
    setItems(newItems);
    setPrev(-1);
    setDisabled(false);

     if (newItems.every(card => card.stat === "correct")) {
      setEndMessage("Well done! Let’s see if you can do it again. Up for another?");
    }
  } else {
    newItems[current] = { ...newItems[current], stat: "wrong" };
    newItems[prev] = { ...newItems[prev], stat: "wrong" };
    setItems(newItems);

    setTimeout(() => {
      setItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[current] = { ...updatedItems[current], stat: "" };
        updatedItems[prev] = { ...updatedItems[prev], stat: "" };
        return updatedItems;
      });
      setPrev(-1);
      setDisabled(false);
    }, 1000); // 
  }
}

function handleClick(id: number) {
  if (disabled) return;
  if (items[id].stat === "correct" || items[id].stat === "wrong") return; 

  const newItems = [...items];
  newItems[id] = { ...newItems[id], stat: "active" };
  setItems(newItems);

  if (prev === -1) {
    setPrev(id);
  } else {
    setDisabled(true); 
    setTimeout(() => {
      check(id);
    }, 500); 
  } 

}

return ( 
<div className="relative bg-myOcean">  
  <div className="h-screen bg-myWarm content-center sm:mx-6 pb-10 flex flex-col justify-center items-center">
     <p className="text-2xl sm:text-4xl font-myHeader text-myBlue pb-8">Memory</p>

    {endMessage && (
      <div
        className="absolute inset-0 flex items-center justify-center z-20"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative h-screen bg-white w-lg p-6 rounded-lg text-center shadow-lg">
          <button
          type="button"
          aria-label="Close"
          className="absolute top-2 right-2 text-myBlue cursor-pointer hover:text-myDark text-3xl active:scale-110 sm:active:scale-100"
          onClick={() => setEndMessage("")}
            >
          <span className="sr-only">Close</span>
          <FaTimes size={20} />
          </button>

          <GiPodiumWinner className="mx-auto mb-2 text-5xl font-myText text-myBlue" />
          <p className="mb-6 text-lg font-myText text-myOcean">{endMessage}</p>
          <button
            className="px-4 py-2 bg-myBlue font-myText font-bold text-white rounded hover:bg-myDark cursor-pointer active:scale-110 sm:active:scale-100"
            onClick={() => {
              setEndMessage("");         
              window.location.reload();   
            }}
          >
            Play again
          </button>
            
        </div>
      </div>
    )}
      <div className="grid grid-cols-4 grid-rows-4 h-80 sm:h-100 w-80 sm:w-100 gap-2">   
        {items.map((item, index) => (
        <MemoryCard 
        key={index} 
        item={item} 
        id={index} 
        handleClick={handleClick}
        />
      ))}
      </div>
      <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
        </Link>
  </div>  
</div>
)}

export default Memory;