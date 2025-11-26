import Alert from '@mui/material/Alert';

interface AlertConfig {
    description: string;
}

export default function AlertUI( config:AlertConfig ) {
    return (
        <Alert variant="filled" severity="success" onClose={() => {}}> {config.description} </Alert>
    )
}