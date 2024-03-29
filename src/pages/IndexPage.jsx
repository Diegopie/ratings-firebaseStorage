import { useRef, useState } from "react";
import { storage } from "../services/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 }  from 'uuid';
import axios from "axios";

export default function IndexPage() {

  const title = useRef(null);
  const overview = useRef(null);
  const releaseDate = useRef(null);
  const [ userImg, setUserImg ] = useState(null)

  // console.log(uuidv4());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userImg) {
      alert("Upload a Poster!")
      return;
    }

    // Ref takes to args(arg1 = ourFBStorage, arg2 = imgPathForFBConsole)
    const imgRef = ref(storage, `posters/${userImg.name}_${uuidv4()}`)
    // console.log(imgRef);

    // uploadBytes takes to args(where to store in bucket: ref, imageToUpload)
    uploadBytes(imgRef, userImg).then( (snapshot) => {
      console.log(snapshot);

      // getDownloadURL takes one arg (refToQuery)
      getDownloadURL(imgRef).then( async (url) => {
        // console.log(url);

        const dbObject = {
          title: title.current.value,
          overview: overview.current.value,
          releaseDate: releaseDate.current.value,
          posterPath: url
        }

        console.log(dbObject);

        const res = await axios.post('/api/movies/create', dbObject);

        if (res.data.success) {
          alert('Added Move')
          console.log(res.data);
        }

      })
    })
    
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
            <input type="file" accept=".png, .jpg, .heic "
              onChange={(event) => {
                // console.log(event.target.files);
                setUserImg(event.target.files[0])
              }}
            />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
