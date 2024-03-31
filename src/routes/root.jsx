import React, { useState } from 'react';
import MovieReview from "../components/MovieReview";

export default function Root() {
  const [search, setSearch] = useState('');

  const movies = [
    {
      title: "The Last Jedi",
      director: "Richard Marquand",
      year: 1983,
      imgLink: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/773B031A52B5727F7C218E42149B45095C21A8BA56601EB1F51FC46485304210/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp'
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      director: "Chris Columbus",
      year: 2003,
      imgLink: 'https://imageservice.disco.peacocktv.com/uuid/f7b83be7-4901-3f80-8325-7b7f853b3b33/TITLE_ART_16_9?language=eng&territory=US&proposition=NBCUOTT&version=fc83129f-51da-37b9-8f1c-8c3166180432'
    },
    {
      title: "3 Idiots",
      director: "Rajkumar Hirani",
      year: 2009,
      imgLink: 'https://bcomber.org/wp-content/uploads/2021/10/Screen-Shot-2021-10-26-at-6.48.45-AM-900x499.png'
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      director: "Peter Jackson",
      year: 2001,
      imgLink: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9DTZIUT5ZDij2jvM7iuTu8FW8B7dZrOqxco1ooFou8n-YfqTSaTmsWysGB8sE-A73zEVAmKiPmvcd5eUbYDD5FAaO336QRPngL6Et8aKGshES8RGtbkQnfWLF12VmZegcfJvYrKkM0CY/s1600/lord-of-the-rings-trilogy-movie-poster.jpg'
    }
  ];

  const filteredMovies = search 
  ? movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())) 
  : [];

  return (
    <>
      <h1>Movie Review Website</h1>
      <input
        type="text"
        placeholder="Search movie titles..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filteredMovies.map(movie => (
        <MovieReview
          key={movie.title}
          title={movie.title}
          director={movie.director}
          year={movie.year}
          imgLink={movie.imgLink}
        />
      ))}
    </>
  );
}