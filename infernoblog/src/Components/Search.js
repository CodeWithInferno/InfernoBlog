// SearchComponent.js
import React, { useState } from 'react';
import firebase from '../firebase'; // Update the path based on your project structure

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDataFromFirebase = async () => {
    try {
      const profilesRef = firebase.database().ref('profiles');
      const snapshot = await profilesRef
        .orderByChild('title')
        .equalTo(searchQuery)
        .once('value');

      const results = [];
      snapshot.forEach(childSnapshot => {
        results.push(childSnapshot.val());
      });

      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={fetchDataFromFirebase}>Search</button>

      {/* Display search results */}
      {searchResults.map(result => (
        <div key={result.id}>
          <p>Name: {result.name}</p>
          <p>Title: {result.title}</p>
          {/* Add other fields you want to display */}
        </div>
      ))}
    </div>
  );
};

export default SearchComponent;
