import React from 'react'

import SearchForm from "./SearchForm"

const Home = () => (
    <div>
        <SearchForm/>
        <div className="container mt-5" align="center">
            <h1>
                Welcome stranger!
            </h1>
            <h2>
                You can search your flights on the top of the page.
            </h2>
            <body>
            <div className="container mt-5" align="center">
                This is a simple SPA created with React and
                <a href={'https://skypickerpublicapi.docs.apiary.io/#'}> Skypicker API</a>
            </div>
            </body>
        </div>
    </div>
)

export default Home
