import React from 'react';
import config from '../config';

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
  setData: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    const response = await fetch(`${config.API_URL}/ranks`); // Dodajemy id do URL
    if (!response.ok) {
      throw new Error('Nie udało się pobrać danych');
    }
    const data = await response.json(); // Otrzymujemy dane

    setData(data); // Ustawiamy dane w stanie
  } catch (error) {
    console.error('Error fetching data:', error); // Obsługujemy błąd
  }
};

export const getNumberOfScouts = async (
  setData: React.Dispatch<React.SetStateAction<number[]>>,
  id: number, // Przekazujemy id drużyny jako parametr
) => {
  try {
    const response = await fetch(`${config.API_URL}/scouts/number/${id}`); // Dodajemy id do URL
    if (!response.ok) {
      throw new Error('Nie udało się pobrać danych');
    }
    const data = await response.json(); // Otrzymujemy dane
    console.log(id); 
    
    const numberOfScouts = data[0]?.numberOfScouts || 0;
    const numberOfPatrols = data[0]?.numberOfPatrols || 0;
    const numberOfBadges = data[0]?.numberOfBadges || 0;

    console.log(numberOfScouts, numberOfPatrols, numberOfBadges);

    setData([numberOfScouts, numberOfPatrols, numberOfBadges]);
  } catch (error) {
    console.error('Error fetching data:', error); // Obsługujemy błąd
  }
};

export const updateScout = async (id: any, updatedData: any) => {
  const response = await fetch(`https://your-api-url/scouts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Błąd podczas aktualizacji danych harcerki');
  }
};

export const getBadges = async (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  try {
    const response = await fetch(`${config.API_URL}/badges`); // Dodajemy id do URL
    if (!response.ok) {
      throw new Error('Nie udało się pobrać danych');
    }
    const data = await response.json(); // Otrzymujemy dane

    setData(data); // Ustawiamy dane w stanie
  } catch (error) {
    console.error('Error fetching data:', error); // Obsługujemy błąd
  }
};
