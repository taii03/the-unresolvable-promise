import { Signal, execute } from 'sunar';
import { handleInteraction } from 'sunar/handlers';

const signal = new Signal('interactionCreate');

execute(signal, handleInteraction);

export { signal };
