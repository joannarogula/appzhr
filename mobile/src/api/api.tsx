import React from 'react';
import config from "../config";

export const getScouts = async (
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    id: number, // Przekazujemy id drużyny jako parametr
  ) => {
    try {
      const response = await fetch(`${config.API_URL}/scouts/${id}`); // Dodajemy id do URL
      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych');
      }
      const data = await response.json(); // Otrzymujemy dane
      // console.log('sukces', 'Pobrano dane ')
  
      setData(data); // Ustawiamy dane w stanie
    } catch (error) {
      console.error('Error fetching data:', error); // Obsługujemy błąd
    }
  };
  
  export const getPatrols = async (
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    id: number, // Przekazujemy id drużyny jako parametr
  ) => {
    try {
      const response = await fetch(`${config.API_URL}/patrols/${id}`); // Dodajemy id do URL
      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych');
      }
      const data = await response.json(); // Otrzymujemy dane
      // console.log('sukces', 'Pobrano dane ')
  
      setData(data); // Ustawiamy dane w stanie
    } catch (error) {
      console.error('Error fetching data:', error); // Obsługujemy błąd
    }
  };

  export const getRanks = async (
    setData: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    try {
      const response = await fetch(`${config.API_URL}/ranks`); // Dodajemy id do URL
      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych');
      }
      const data = await response.json(); // Otrzymujemy dane
      console.log(data)
  
      setData(data); // Ustawiamy dane w stanie
    } catch (error) {
      console.error('Error fetching data:', error); // Obsługujemy błąd
    }
  };
  