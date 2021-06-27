import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import { toast } from 'react-hot-toast';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { auth, database } from '../services/firebase';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';


export function Home(){
  const history = useHistory();
  const { user, signInWithGoogle  } = useAuth();
  const [roomCode, setRoomCode] = useState('');


  async function handleCerateRoom() {
    if (!user){
      toast.success('Successfully toasted!');
      await signInWithGoogle()
    }
      
      history.push('/rooms/new');  
  }

  async function signOutGoogle() {
    await auth.signOut().then(() => {
      window.location.reload();
    }).catch((error) => 
    {
      toast.error('Sign out error');
    });
    
    toast.success('Sigout sucessfu, redirect you access!!');


  } 

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists())  {
      alert('Room does not exist.');
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCerateRoom} className="create-room">
           {!user ? <img src={googleIconImg} alt="" /> : ""} 
           {!!user ? `Crie sua sala ${user.name}.` : "Crie sua sala com o Google."}
          </button>
          <p>{!!user ? `Não é ${user.name}? ` : ""}
          {!!user ? <button className="btnOut" onClick={signOutGoogle}>sair</button> : "" }
          </p>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text"
            placeholder = "Digite o código da sala" 
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
            />
            <Button type="submit"> 
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}