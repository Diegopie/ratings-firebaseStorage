import { useRef } from "react";

export default function IndexPage() {

  const title = useRef(null);
  const overview = useRef(null);
  const releaseDate = useRef(null);

  // console.log(userImg);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <>
      <h1>Movie Ratings App</h1>
      <p>Welcome!</p>
      <section>
        <h2>Add A Movie</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input type='text' required ref={title} />
          </div>
          <div>
            <label>Overview</label>
            <input type='text' required ref={overview} />
          </div>
          <div>
            <label>Release Date</label>
            <input type='date' required ref={releaseDate} />
          </div>
          <div>
            <label>Poser</label>
            <input />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
