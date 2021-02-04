/**
 * Configuration data for the backend.
 */

// Import environment
import { environment } from './environments/environment';

export class Configuration {
    public static backend_url = environment.production ? 'http://3.21.41.182' : 'http://localhost:8000';
    public static api_url = `${Configuration.backend_url}/api`;
    public static auth_url = `${Configuration.backend_url}/authentication`;
}