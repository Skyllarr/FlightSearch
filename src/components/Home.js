import React from 'react'

const Home = () => (
    <div>
        <div className="container mt-5" align="center">
            <h1>
                Welcome stranger!
            </h1>
            <h2>
                You can search your flights on top of the page.
            </h2>
            <div>
                <div className="container mt-5" align="center">
                    This is a simple SPA created with React and
                    <a href={'https://skypickerpublicapi.docs.apiary.io/#'}> Skypicker API</a>
                </div>
            </div>
        </div>
    </div>
)

export default Home
