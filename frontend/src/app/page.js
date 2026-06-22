"use client";
import { useState } from 'react';

export default function Home() {
    const [url, setUrl] = useState('');

    const handleOnboard = (e) => {
        e.preventDefault();
        console.log("Onboarding target app:", url);
        // Route to /arena page once API returns the blueprint data
    };

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#0f172a', color: '#fff', minHeight: '100vh' }}>
            <h1>⚔️ Fluxio.ai</h1>
            <p>Onboard your target Swagger documentation to generate the battle arena grid.</p>
            <form onSubmit={handleOnboard}>
                <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    placeholder="https://petstore.swagger.io/v2/swagger.json" 
                    style={{ padding: '0.5rem', width: '400px', borderRadius: '4px', border: 'none', marginRight: '1rem' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Generate Arena
                </button>
            </form>
        </main>
    );
}