import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(smoothie => smoothie.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();
  
      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      }
  
      if (data) {
        setSmoothies(data);
        setFetchError(null);
        // console.log("data",data);
      }
    };
    
    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
         <div className="smoothie-grid">
         {smoothies.map((smoothie) => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
