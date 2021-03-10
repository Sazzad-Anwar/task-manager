import { Avatar, Card, CardContent, Grid, Typography, IconButton } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Header from '../Components/Header';

const Profile = () => {
    const name = localStorage.getItem('username');
    const phone = localStorage.getItem('phone');
    return (
        <>
            <Header />
            <div className="text-center" style={{ margin: '2rem 5rem', position: 'relative' }}>
                <Avatar style={{ height: 200, width: 200, border: '2px solid #AD60D0' }}>
                    <img src="https://picsum.photos/200/300" alt="pro-pic" />
                </Avatar>
                <div>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="icon-button-file">
                        {/* <Fab
                            size="small"
                            color="primary"
                            aria-label="add"
                            style={{ position: 'absolute', bottom: 10, right: 15 }}
                        >
                            <AddAPhotoIcon />
                        </Fab> */}
                        <IconButton
                            color="primary"
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 15,
                                border: '1px solid #AD60D0',
                                background: '#041955',
                            }}
                            aria-label="upload picture"
                            component="span"
                        >
                            <AddAPhotoIcon className="text-white" />
                        </IconButton>
                    </label>
                </div>
            </div>
            <div className="mx-2">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card className="bg-color card-press text-center">
                            <CardContent>
                                <Typography variant="h5" component="h2" className="text-white">
                                    {name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className="bg-color card-press text-center">
                            <CardContent>
                                <Typography variant="h5" component="h2" className="text-white">
                                    {phone}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Profile;
