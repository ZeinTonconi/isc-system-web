import { useState, MouseEvent} from "react"

import { Box, Card, CardActionArea, CardContent, Collapse, IconButton, Menu, MenuItem, styled, Typography, useMediaQuery } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConfirmDelete from "../common/ConfirmDelete"
import PermissionTable from "./PermissionTable";
import { ExpandMoreProps } from "../../models/expandMorePropsInterface";
import { RoleComponentProps } from "../../models/roleComponentProps";

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const RoleComponent : React.FC<RoleComponentProps> = ({ role, selectedRole, onRoleClick, onDelete }) => {

    const [expanded, setExpanded] = useState(false)
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const [anchorE1, setAnchorE1] = useState<null | HTMLElement> (null); 
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorE1(event.currentTarget);
    }

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
            <Card sx={{ maxWidth: isSmall ? 700 : '100%', backgroundColor: selectedRole === role.roleName ? 'LightGray' : 'inherit', marginBottom:2}}>
                <CardActionArea onClick={() => onRoleClick(role.roleName)}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                fontWeight: selectedRole === role.roleName ? 'bold' : 'normal',
                            }}
                        >
                            {role.roleName}
                        </Typography>
                            <Box>
                                {isSmall && (
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                )}

                                <IconButton
                                    color="inherit"
                                    aria-label="more"
                                    onClick={handleClick}
                                >
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>
                {isSmall && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <PermissionTable />
                        </CardContent>
                    </Collapse>
                )}
            </Card>

            <Menu
                anchorEl={anchorE1}
                open={Boolean(anchorE1)}
                onClose={handleClose}
            >
                <MenuItem onClick={hadleEditClick}>Editar nombre</MenuItem>
                <MenuItem onClick={hadleDeletClick}>Eliminar</MenuItem>
            </Menu>
            {showDelete && (
                <ConfirmDelete roleName={role.roleName} isVisible={showDelete} setIsVisible={setShowDelete} onDelete={() => onDelete(role.roleName)}/>
            )}
        </>
    )
}

export default RoleComponent