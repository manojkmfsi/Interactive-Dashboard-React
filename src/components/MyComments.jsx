import { useSharedState } from '../context/SharedStateContext.jsx';
import { useState } from "react";
import { toast } from 'react-toastify';

function generateId() {
	return crypto.randomUUID()
}
const MyComments = () => {
    const { selectedPokemon } = useSharedState();
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComment] = useState(() => {
        try {
            const storedComments = localStorage.getItem('myComments');
            return storedComments ? JSON.parse(storedComments) : [];
        } catch (e) {
            console.error("Could not load comments from localStorage", e);
            return [];
        }
    });

    const pokeComments = comments.filter(c => (c?.pokemon_id && c.id && c.pokemon_id === selectedPokemon.id));

    const handleCommentSubmit = () => {
        if(!commentInput){
            return;
        }
        const newComments = [...comments, {id: generateId(), pokemon_id: selectedPokemon.id, value: commentInput }];
        setCommentInput('');
        setComment(newComments);
        localStorage.setItem('myComments', JSON.stringify(newComments));
        toast('Comment added.');
    }
    const handleCommentRemove = (id) => {
        const allComments = comments.filter((c) => c.id !== id);
        setComment(allComments);
        localStorage.setItem('myComments', JSON.stringify(allComments));
        toast('Comment deleted.');
    }
    return (
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-inner mt-6">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            <div className="space-y-3 mb-4">
                {pokeComments.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
                ) :
                    pokeComments.map((comment) => (
                        <div key={comment.id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-4">
                                <span>{comment.value}</span>
                                <button type="button" className="text-right bg-red-500 text-white font-bold px-1 text-sm rounded-lg hover:bg-red-600" onClick={() => handleCommentRemove(comment.id)}>Delete</button>
                            </p>
                        </div>
                    ))
                }
                <textarea type="text" value={commentInput} onChange={(e) => { setCommentInput(e.target.value) }} className="w-full p-3 rounded-lg border"
                    rows="3"
                ></textarea>
                <button type="button" className="w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition-colors mt-" onClick={handleCommentSubmit}> Post Comment</button>
            </div>
        </div>
    );
}

export default MyComments;

