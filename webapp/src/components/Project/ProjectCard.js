import React from "react";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProjectCard = (props) => {

  const project = props.project
  const user_type= props.user_type

  const navigate = useNavigate()

  const navigateProject = () => {
    if(user_type=="student"){
      navigate('/student/edit-project', {state: project})
    }
    else{
      navigate('/contributor/view-project', {state: project})
    }
  }

  return (
      <Box sx={{ maxWidth: "70%", marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>
        <Card variant="outlined" onClick={navigateProject} sx={{cursor: "pointer"}}>
          <Box sx={{marginRight: 0, marginLeft: "auto", maxWidth: "50px"}}>
            <div className="likedNumber">
              {project.likers.length}
            </div>
            <FavoriteIcon />
          </Box>
          <CardContent>
            <Typography sx={{ fontSize: 34 }} gutterBottom>
              {project.title}
            </Typography>
            <CardMedia
              component="img"
              height="300"
              image={project.image}
              alt="not found"
            />
          </CardContent>
          <CardActions>
            <Button size="small" >Project Details</Button>
          </CardActions>
        </Card>
      </Box>
  );
};

export default ProjectCard;
