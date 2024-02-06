import { useParams } from 'react-router-dom'

const App: React.FC = () => {
    const params = useParams();
    console.log(params);

    return (
        <div>
            {params.id}
        </div>
    )
}
export default App