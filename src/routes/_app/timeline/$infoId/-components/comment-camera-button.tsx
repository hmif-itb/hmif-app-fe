import { Camera } from 'lucide-react';
import React from 'react';

interface CommentCameraButtonProps {
  onCapture: (blob: Blob) => void; // handle selected media
}

const CommentCameraButton: React.FC<CommentCameraButtonProps> = ({
  onCapture,
}) => {
  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      const videoElement = document.createElement('video');
      document.body.appendChild(videoElement);
      videoElement.srcObject = stream;
      videoElement.play();

      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
          }
        }, 'image/jpeg');
      }

      stream.getVideoTracks()[0].stop();
      document.body.removeChild(videoElement);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <button type="button" className="p-1" onClick={handleCapture}>
      <Camera className="size-6 text-green-300" />
    </button>
  );
};

export default CommentCameraButton;
