import { RingLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <RingLoader color="#d63636" />
    </div>
  )
}

export default Loading
