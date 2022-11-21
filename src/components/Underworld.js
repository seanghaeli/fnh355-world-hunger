import Typography from '@mui/material/Typography';
import { Grid, Link } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Map from './Map'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
}

function Underworld() {
    return (
        <div id='underworld' className='underworld'>
            <Grid container spacing={2} columns={16} justifyContent="center" alignItems="center">
                <Grid item xs={8}>
                    <Item className='section'>
                        <Typography variant='h4'>The numbers speak for themselves</Typography>

                        <Typography align='left'>
                            In 2021, 828 million people were affected by global hunger, which is an increase of 150 million people since
                            the beginning of the COVID-19 pandemic<sup>[1]</sup>. 
                        </Typography>
                        <br/>
                        <Typography align='left'>
                            Hunger is a massive problem, and isn't exclusive to the third world, it is seen globally. For example, four million Canadians are classified
                            as food insecure. Those most vulnerable to hunger are children, people of colours, immigrants, single mothers, and 
                            students. Your neighbors could use a helping hand.
                        </Typography>
                        <br/>
                        <Typography align='left' variant='h6'>
                            Did you know that donating to food banks can help alleviate the strains of hunger in your community<sup>[2]</sup>? Use the panel
                            on this website to locate a food bank near you!
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={8} className='inner'>
                    <Item className='section'>
                        <div className='inner'> <Map location={location} zoomLevel={17} className='inner' /> </div>
                    </Item>
                </Grid>
            </Grid>
            <br/><br/>
            <Typography variant='subtitle'>[1]: <Link target="_blank" href='https://www.who.int/news/item/06-07-2022-un-report--global-hunger-numbers-rose-to-as-many-as-828-million-in-2021'> https://www.who.int/news/item/06-07-2022-un-report--global-hunger-numbers-rose-to-as-many-as-828-million-in-2021</Link></Typography>
            <br/>
            <Typography variant='subtitle'>[2]: <Link target="_blank" href='https://link.springer.com/article/10.1007/s10900-015-0147-5'> https://link.springer.com/article/10.1007/s10900-015-0147-5</Link></Typography>
            <br/>
            <Typography variant='subtitle'>Food insecurity map data: <Link target="_blank" href='https://unstats.un.org/sdgs/dataportal'>https://unstats.un.org/sdgs/dataportal</Link></Typography>
        </div>
    )
}

export default Underworld;