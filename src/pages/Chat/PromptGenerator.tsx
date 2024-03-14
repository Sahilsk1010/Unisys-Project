import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { usePromptGenerator } from './hooks';
import { useRef, useEffect } from 'react';
import LoadingLine from '../../components/LoadingLine';
import Button from '../../components/Button';
import Header from './Header'; // Import the Header component
import axios from 'axios'; // Import axios for making HTTP requests

function PromptGenerator() {
  const { handlePromptChange, handleKeyDown, data, prompt, textareaRef, loading, error, sendMessage } = usePromptGenerator();
  const [videoFile, setVideoFile] = useState(null);
  const [sending, setSending] = useState(false); // State to track if sending a message
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [data]);

  const handleFileChange = (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleSendPrompt = async () => {
    try {
      if (prompt.trim() !== '' || videoFile !== null) {
        setSending(true); // Set sending state to true when sending a message

        const formData = new FormData();
        formData.append('prompt', prompt);
        if (videoFile) {
          formData.append('video', videoFile);
        }

        // Send the FormData to the server using axios POST request
        await axios.post('http://your-node-server-url/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Reset states after sending
        setVideoFile(null);
        setSending(false); // Reset sending state after sending
      }
    } catch (error) {
      console.error('Error sending prompt:', error);
      setSending(false); // Reset sending state on error
    }
  };

  return (
    <div>
      <Header title="Surgeon's Eye" /> {/* Render the Header component with title Surgeon's Eye */}
      <div className='conversation-container'>
        <div className='messages-container' ref={messagesContainerRef}>
          {data &&
            data.map((message, index) => (
              <div className={`message ${message.type === 'inbound' ? 'inbound' : 'outbound'}`} key={index}>
                <strong>{message.type === 'inbound' ? 'Gemini' : 'You'}</strong>
                {message.type === 'inbound' ? (
                  <ReactMarkdown className='markdown-render'>{message.message}</ReactMarkdown>
                ) : (
                  <p>{message.message}</p>
                )}
              </div>
            ))}
            {loading && <LoadingLine />}
            {error && error !== "Method doesn't allow unregistered callers (callers without established identity). Please use API Key or other form of API consumer identity to call this API." && <div className='error'>{error}</div>}
        </div>
        <div className='message-input-container'>
          <textarea
            id='prompt'
            value={prompt}
            className='prompt-input'
            placeholder='Type your message...'
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
            ref={textareaRef}
          />
          <div className="file-input-container">
            <input
              type='file'
              accept='video/*'
              onChange={handleFileChange}
            />
            {sending && <LoadingLine />} {/* Show loading line if sending */}
          </div>
          <Button disabled={!prompt.trim() && !videoFile} onClick={handleSendPrompt}>Send</Button>
        </div>
      </div>
    </div>
  );
}

export default PromptGenerator;
