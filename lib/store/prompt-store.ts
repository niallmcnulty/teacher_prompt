import { create } from 'zustand';
import { generatePrompt } from '../utils/prompt-generator';
import { Topic, LearningObjectType, ScaffoldingLevel, BloomsLevel } from '../types';

export interface FormState {
  grade: number;
  topic: Topic;
  learningObjectType: LearningObjectType;
  scaffoldingLevel: ScaffoldingLevel;
  bloomsLevel: BloomsLevel;
  includeSouthAfricanContext: boolean;
  errors: {
    grade?: string;
    topic?: string;
    learningObjectType?: string;
    scaffoldingLevel?: string;
    bloomsLevel?: string;
  };
}

interface PromptStore {
  formState: FormState;
  prompt: string;
  setFormState: (state: Partial<FormState>) => void;
  generateNewPrompt: () => void;
  validateForm: () => boolean;
}

const initialState: FormState = {
  grade: 7,
  topic: 'The Economy' as Topic,
  learningObjectType: 'Lesson Plan',
  scaffoldingLevel: 'High Support',
  bloomsLevel: 'Remember',
  includeSouthAfricanContext: true,
  errors: {}
};

export const usePromptStore = create<PromptStore>((set, get) => ({
  formState: initialState,
  prompt: '',

  setFormState: (newState) => {
    const currentState = get().formState;
    const updatedState = {
      ...currentState,
      ...newState,
      errors: { ...currentState.errors, ...(newState.errors || {}) }
    };
    set({ formState: updatedState });
  },

  generateNewPrompt: () => {
    const currentState = get().formState;
    const newPrompt = generatePrompt(currentState);
    set({ prompt: newPrompt });
  },

  validateForm: () => {
    const { formState } = get();
    const errors: FormState['errors'] = {};

    if (!formState.grade) {
      errors.grade = 'Please select a grade';
    }

    if (!formState.topic) {
      errors.topic = 'Please select a topic';
    }

    if (!formState.learningObjectType) {
      errors.learningObjectType = 'Please select a learning object type';
    }

    if (!formState.scaffoldingLevel) {
      errors.scaffoldingLevel = 'Please select a scaffolding level';
    }

    if (!formState.bloomsLevel) {
      errors.bloomsLevel = 'Please select a Bloom\'s taxonomy level';
    }

    set({ formState: { ...formState, errors } });
    return Object.keys(errors).length === 0;
  }
})); 