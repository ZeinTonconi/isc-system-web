import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, Collapse, IconButton, IconButtonProps, styled, Typography, Box, Button, Icon } from '@mui/material';
import { useState } from 'react';
import ConfirmDelete from './ConfirmDelete';
import PermissionTable from './PermissionTable';

type Role = {
    roleName: string
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const RoleComponentXs = ({ role }: { role: Role }) => {
    const [expanded, setExpanded] = useState(false);
    const [showDelete, setShowDelete] = useState<boolean>(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Card sx={{ maxWidth: 700 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>
                            {role.roleName}
                        </Typography>
                        <Box>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                            <Button
                                sx={{
                                    padding: 0,
                                    minWidth: 0,
                                    minHeight: 0,
                                    width: 24,
                                    height: 24,
                                }}
                                onClick={() => {
                                    setShowDelete(true)
                                }}>
                                <Icon sx={{
                                    fontSize: 24,
                                }}>
                                    <DeleteIcon color="primary" />
                                </Icon>
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <PermissionTable />
                    </CardContent>
                </Collapse>
            </Card>
            {showDelete && (
                <ConfirmDelete roleName={role.roleName} setShowDelete={setShowDelete} />
            )}
        </>
    );
}

export default RoleComponentXs