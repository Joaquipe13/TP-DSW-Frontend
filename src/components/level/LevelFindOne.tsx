import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
import { Level } from  "./../types";
import "./level.css";
import { remove } from "./../hooks/useDelete";


export const LevelFindOne = () => {
    const { id } = useParams(); 
    const { data: level, loading, error, fetchData } = useGet<Level>(`/api/levels/${id}`);
    const navigate = useNavigate();

    const handleRemove = () => {
        const confirmed = window.confirm(`¿Desea eliminar el level: ${level?.name}?`);
        if (confirmed) {
            remove(`/api/levels/${id}`);
            console.log(`El level ${level?.name} fue eliminado.`);
            navigate('/level');
          // Aquí puedes agregar la lógica para crear el level
        } else {
            console.log(`Creación del level ${level?.name} cancelada.`);
        }
    };
    useEffect(() => {
      fetchData();
    }, [fetchData, id]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h2>Level</h2>
        <p>{level?.name}</p>
        <button >
            <Link to="/level">Back to Levels</Link>
        </button> 
        <button className="delete-button" onClick={handleRemove}>Delete</button>
        <button className="submit-button"><Link to={`/level/update/${id}`}>Edit</Link></button> 
      </div>
    );
  }