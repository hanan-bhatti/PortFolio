'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square, Move } from 'chess.js';
import { RefreshCw, Play, SkipBack, Info } from 'lucide-react';

export default function ChessGame() {
    const [game, setGame] = useState(new Chess());
    const [status, setStatus] = useState('White to move');
    const [moveHistory, setMoveHistory] = useState<string[]>([]);

    // Cast component to any to bypass problematic type definitions in react-chessboard
    const ValidatedChessboard = Chessboard as any;

    const makeAMove = useCallback(
        (move: string | { from: string; to: string; promotion?: string }): Move | null => {
            try {
                const gameCopy = new Chess(game.fen());
                const result = gameCopy.move(move);
                if (result) {
                    setGame(gameCopy);
                    setMoveHistory(prev => [...prev, result.san]);
                    return result;
                }
            } catch (e) {
                return null;
            }
            return null;
        },
        [game]
    );

    function onDrop(sourceSquare: Square, targetSquare: Square): boolean {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q', // always promote to queen for simplicity
        });

        if (move === null) return false;
        return true;
    }

    useEffect(() => {
        if (game.isCheckmate()) {
            setStatus(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`);
        } else if (game.isDraw()) {
            setStatus('Draw!');
        } else {
            setStatus(`${game.turn() === 'w' ? 'White' : 'Black'} to move${game.inCheck() ? ' - Check!' : ''}`);
        }
    }, [game]);

    const resetGame = () => {
        setGame(new Chess());
        setMoveHistory([]);
    };

    return (
        <div className="flex flex-col md:flex-row h-full bg-[#c0c0c0] font-sans text-black overflow-hidden">
            {/* Game Board Section */}
            <div className="flex-1 flex items-center justify-center p-4 bg-[#808080] overflow-hidden min-h-0">
                <div className="w-full max-w-[420px] aspect-square border-4 border-gray-400 border-t-white border-l-white bg-[#c0c0c0] p-1 shadow-2xl relative">
                    <ValidatedChessboard
                        id="vibe-os-chess"
                        position={game.fen()}
                        onPieceDrop={onDrop}
                        boardOrientation="white"
                        customDarkSquareStyle={{ backgroundColor: '#779556' }}
                        customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                    />
                </div>
            </div>

            {/* Info/Controls Panel */}
            <div className="w-full md:w-64 border-l-2 border-white flex flex-col shrink-0">
                <div className="p-3 border-b border-gray-400 bg-[#d4d0c8]">
                    <h2 className="font-bold flex items-center gap-2 text-xs uppercase underline">
                        <Play className="w-3 h-3 fill-black" /> Game Status
                    </h2>
                    <div className="mt-2 bg-white border-2 border-t-gray-600 border-l-gray-600 p-2 text-[11px] font-bold min-h-[40px]">
                        {status}
                    </div>
                </div>

                {/* Moves History */}
                <div className="flex-1 p-3 overflow-hidden flex flex-col min-h-0">
                    <h3 className="text-[10px] font-bold mb-1 uppercase underline">Move Log:</h3>
                    <div className="flex-1 bg-white border-2 border-t-gray-600 border-l-gray-600 p-2 overflow-auto text-[10px] font-mono">
                        {moveHistory.length === 0 ? (
                            <span className="text-gray-400 italic text-[9px]">No moves recorded.</span>
                        ) : (
                            <div className="grid grid-cols-2 gap-x-4">
                                {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                                    <React.Fragment key={i}>
                                        <div className="text-gray-500 border-b border-gray-100">{i + 1}. {moveHistory[i * 2]}</div>
                                        <div className="text-black font-bold border-b border-gray-100">{moveHistory[i * 2 + 1] || ''}</div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-3 border-t border-white grid grid-cols-2 gap-2 bg-[#d4d0c8] shrink-0">
                    <button
                        onClick={resetGame}
                        className="flex items-center justify-center gap-1 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 p-1 text-[10px] font-bold"
                    >
                        <RefreshCw className="w-3 h-3" /> NEW
                    </button>
                    <button
                        className="flex items-center justify-center gap-1 bg-[#c0c0c0] border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 p-1 text-[10px] font-bold opacity-50 cursor-not-allowed"
                    >
                        <SkipBack className="w-3 h-3" /> UNDO
                    </button>
                </div>
            </div>
        </div>
    );
}
