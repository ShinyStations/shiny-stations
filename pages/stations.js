import React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { Entity, Scene } from 'aframe-react';

export default function Stations() {

    const [appRendered, setAppRendered] = useState(false);
    useEffect(() => {
      if (typeof window !== "undefined") {
        require("aframe");
        require("aframe-particle-system-component");
        setAppRendered(true);
      }
    });

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>A-Frame React Boilerplate</title>
        </Head>

        {appRendered &&
          (<Scene>
            <a-assets>
              <a-asset-item id="station" src="https://storageapi.fleek.co/c4033a1e-dadc-4b4e-b891-6486fc293e81-bucket/shiny-assets/shiny1.glb"></a-asset-item>     
              <img id="skybox" src="https://storageapi.fleek.co/c4033a1e-dadc-4b4e-b891-6486fc293e81-bucket/shiny-assets/skybox.jpeg"></img>
            </a-assets>
    
            <Entity camera="active: true" look-controls wasd-controls position="0 1.6 12"></Entity>
            <Entity id="statin001" gltf-model="#station"></Entity>
            <a-cylinder position="0 0.25 0" rotation="0 0 0" height="0.4" color="#4CC3D9"></a-cylinder>
    
        
            <Entity id="solar-system" position="-6 0 -5" rotation="0 45 0" scale="0.4 0.4 0.4">
              <a-sphere id="earth" position="0 0.5 0" rotation="0 0 0" color="#4CC3D9"></a-sphere>
              <a-sphere id="mars" scale="0.5 0.5 0.5" position="-2 0.4 0" rotation="0 0 0" color="#4CC3D9"></a-sphere>
            </Entity>
    
            <a-light position="0.4 0 8"></a-light>
            <Entity position="0 12.5 12" light="color: #6b7cff"></Entity>
            <a-light position="0.05188 2.11908 0.75957" light="type: point"></a-light>
            <Entity light="type: ambient"></Entity>
            <a-sky src="#skybox" rotation="0 -90 0"></a-sky>
            //planets//
            <Entity id="planet01" position="150 20 -40">
              <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" scale="10 10 10"></a-sphere>
              <a-torus position="0 0.75 -3" rotation="45 20 48" radius="15.5" color="#FFC65D"></a-torus>
            </Entity>
          
          </Scene>)
        }
      </div>
    )
}
