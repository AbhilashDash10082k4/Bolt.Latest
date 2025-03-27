import {useNavigate} from 'react-router-dom';

export default function Button() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/builder');
    }
  return (
    <button
    type="submit"
    className="mt-4 max-w-3/4 bg-gradient-to-r from-blue-700 via-blue-900 to-gray-800 text-cyan-300 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
    onClick={handleClick}
  >
    Generate Website
  </button>
  )
}