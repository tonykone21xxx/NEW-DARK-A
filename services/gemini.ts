
import { GoogleGenAI, Modality, Chat } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const API_KEY_ERROR_MESSAGE = "Erreur de clé API : Veuillez vérifier que votre clé API est configurée correctement ou que le service est activé pour votre projet.";

export class GeminiChatService {
  private chat: Chat | null = null;
  private history: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

  constructor(systemInstruction: string) {
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction },
    });
    // Add initial system message if desired, or let the first actual message trigger it.
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      throw new Error("Chat service not initialized.");
    }
    
    // The Gemini API handles history internally for a `Chat` instance.
    // We only add the user message to our local history for display purposes if needed.
    // For `chat.sendMessage`, the `message` parameter is already considered as user input.
    this.history.push({ role: 'user', parts: [{ text: message }] });

    const response = await this.chat.sendMessage({ message });
    const assistantText = response.text || "Désolé, je n'ai pas pu générer de réponse.";
    
    // Add model's response to local history for display
    this.history.push({ role: 'model', parts: [{ text: assistantText }] });

    return assistantText;
  }

  // Get conversation history for display purposes
  getDisplayHistory(): { role: 'user' | 'assistant', text: string }[] {
    return this.history.map(entry => ({
      role: entry.role === 'user' ? 'user' : 'assistant',
      text: entry.parts.map(part => part.text).join('')
    }));
  }

  reset() {
    this.chat = null; // Invalidate the current chat
    this.history = [];
    // A new instance of GeminiChatService would need to be created if a new chat session is desired.
  }
}

// Old `getGeminiChatResponse` is no longer used for interactive chats but might be useful for one-off calls
// Kept for backward compatibility or if other parts of the app still rely on a single call.
// For interactive, stateful chats, use GeminiChatService.
export const getGeminiChatResponse = async (history: any[], message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "Tu es Chloé, l'assistante AutoPilot AI spécialisée dans le Code de la Route. Ton rôle est d'expliquer les règles de conduite françaises de manière pédagogique et précise, en couvrant les priorités, les panneaux, et la sécurité routière. Si l'utilisateur demande une image ou une illustration, dis-lui que tu peux en générer une via le bouton d'illustration.",
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateIllustration = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Crée une illustration claire, éducative et simplifiée pour un élève d'auto-école français. La situation à illustrer est : ${prompt}. Le style doit être professionnel, de haute qualité, réaliste mais avec une emphase sur la clarté pédagogique pour l'apprentissage du Code de la Route.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateSpeech = async (text: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const decodeBase64 = decode;

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): any {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}