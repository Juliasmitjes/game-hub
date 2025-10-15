interface MemoryCardProps {
  item: {
    img: string;
    stat: string;
  };
  id: number;
  handleClick: (id: number) => void;
}

function MemoryCard({item, id, handleClick}: MemoryCardProps){

  return (
  <div className="h-full">   
    <div
      className={`card ${item.stat} m-0 p-0 h-full bg-myOcean flex justify-center items-center rounded-md cursor-pointer shadow-lg border-[6px] border-myOcean`}
      onClick={() => handleClick(id)}
      >
      <img src={item.img} alt="" className="card-img max-w-7/10" />
    </div>
  </div> 
)}

export default MemoryCard;