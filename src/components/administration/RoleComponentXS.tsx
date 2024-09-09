import { MouseEvent, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, Collapse, IconButton, IconButtonProps, styled, Typography, Box, Button, Icon, CardActionArea, Menu, MenuItem, useMediaQuery } from '@mui/material';
import PermissionTable from './PermissionTable';
import { Role } from '../../models/roleInterface';
import { ExpandMoreProps } from '../../models/expandMorePropsInterface';
import { theme } from '../../theme/theme';
import { GridMoreVertIcon } from '@mui/x-data-grid';
import ConfirmDelete from '../common/ConfirmDelete';
import { RoleComponentProps } from '../../models/roleComponentProps';

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const RoleComponentXs: React.FC<RoleComponentProps> = ({ role, selectedRole, onRoleClick, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const [anchorE1, setAnchorE1] = useState<null| HTMLElement> (null);
    const isSmall = useMediaQuery((theme: any)=> theme.breakpoints.down('sm'))

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorE1 (event.currentTarget);
    };

    const handleClose = () => {
        setAnchorE1(null);
    };

    const hadleDeletClick = () => {
        setShowDelete(true);
        handleClose();
    }

    const hadleEditClick = () => {
        handleClose(); 
    }
    return (
        <>
        <Card sx={{ maxWidth: 700 }}>
            <CardActionArea onClick={handleExpandClick}>
                <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>
                                {role.roleName}
                            </Typography>
                            <Box>
                                <IconButton
                                    color = "inherit"
                                    aria-label='more'
                                    onClick={handleClick}
                                >
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
            </CardActionArea> 
            <Collapse in = {expanded} timeout="auto" unmountOnExit> 
                <CardContent> 
                    <PermissionTable/> 
                </CardContent>
            </Collapse>
        </Card>

        <Menu
            anchorEl={anchorE1}
            open={Boolean(anchorE1)}
            onClose={handleClose}
        >
            <MenuItem onClick={hadleEditClick}>Editar</MenuItem>
            <MenuItem onClick={hadleDeletClick}>Eliminar</MenuItem>
        </Menu>
                   
        {showDelete && (
                <ConfirmDelete roleName={role.roleName} isVisible={showDelete} setIsVisible={setShowDelete} onDelete={() => onDelete(role.roleName)}/>
            )}
        </>
    );
}

export default RoleComponentXs; 
