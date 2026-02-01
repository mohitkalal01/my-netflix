import { useState, useEffect } from 'react';
import api from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorState from '../components/ErrorState';

const Admin = () => {
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'bollywood',
        language: 'hindi',
        genre: '',
        thumbnail: null,
        video: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await api.get('/movies');
                setMovies(data);
            } catch (err) {
                console.error("Could not fetch movies", err);
            }
        };
        fetchMovies();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const movieData = new FormData();
        for (const key in formData) {
            movieData.append(key, formData[key]);
        }

        try {
            await api.post('/movies', movieData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Reset form and refetch movies
            setFormData({
                title: '',
                description: '',
                category: 'bollywood',
                language: 'hindi',
                genre: '',
                thumbnail: null,
                video: null,
            });
            const { data } = await api.get('/movies');
            setMovies(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add movie');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/movies/${id}`);
            setMovies(movies.filter((movie) => movie._id !== id));
        } catch (err) {
            console.error("Failed to delete movie", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

            <div className="bg-brand-dark p-8 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Add New Title</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <ErrorState message={error} />}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                        <Input type="text" name="genre" placeholder="Genre (e.g., Action, Comedy)" value={formData.genre} onChange={handleChange} required />
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-brand-red">
                            <option value="bollywood">Bollywood</option>
                            <option value="hollywood">Hollywood</option>
                            <option value="series">Series</option>
                        </select>
                        <select name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-brand-red">
                            <option value="hindi">Hindi</option>
                            <option value="english">English</option>
                        </select>
                    </div>
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-brand-red" rows="3" required />
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Thumbnail</label>
                        <input type="file" name="thumbnail" onChange={handleChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-red-700" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Video</label>
                        <input type="file" name="video" onChange={handleChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-red-700" required/>
                    </div>
                    <Button type="submit" disabled={loading} fullWidth>
                        {loading ? 'Adding...' : 'Add Title'}
                    </Button>
                </form>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Manage Titles</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-brand-dark">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Genre</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {movies.map((movie) => (
                                <tr key={movie._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{movie.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{movie.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{movie.genre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button onClick={() => handleDelete(movie._id)} className="text-red-500 hover:text-red-700">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
