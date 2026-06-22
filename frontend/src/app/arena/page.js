"use client";
import GameCanvas from '../../components/GameCanvas';
import AttackHud from '../../components/AttackHud';

export default function Arena() {
    return (
        <div style={{ background: '#0b0f19', minHeight: '100vh', color: '#fff', display: 'flex', padding: '1rem' }}>
            <div style={{ flex: 3 }}>
                <GameCanvas />
            </div>
            <div style={{ flex: 1, marginLeft: '1rem' }}>
                <AttackHud />
            </div>
        </div>
    );
}