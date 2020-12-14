/**
 * Configuration data for the backend.
 */
export class Configuration {
    public static backend_url = 'http://localhost:8000';
    public static api_url = `${Configuration.backend_url}/api`;
    public static auth_url = `${Configuration.backend_url}/authentication`;
}