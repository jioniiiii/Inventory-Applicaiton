const mongoose = require('mongoose');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Genre = require('./models/Genre');
const Label = require('./models/Label');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function seedDB() {
    try {
        //clean db
        await Artist.deleteMany({});
        await Album.deleteMany({});
        await Genre.deleteMany({});
        await Label.deleteMany({});

        //create genres
        const genres = await Genre.create([
            { name: 'Rock' },
            { name: 'Pop' },
            { name: 'Jazz' },
            { name: 'Classical' },
            { name: 'Hip Hop' },
            { name: 'Electronic' },
            { name: 'Country' },
            { name: 'Blues' }
        ]);

        //create labels
        const labels = await Label.create([
            { name: 'Columbia', founded: 1888 },
            { name: 'Warner Bros.', founded: 1958 },
            { name: 'Atlantic', founded: 1947 },
            { name: 'Sony Music', founded: 1929 },
            { name: 'Wrap', founded: 1989 },
            { name: 'Griselda Records', founded: 2012 },
            { name: 'TDE', founded: 2004 },
            { name: 'Def Jam', founded: 1984 },
            { name: 'Boy Better Know', founded: 2005 },
            { name: 'R&S Records', founded: 1983 },
        ]);

         // Create artists
         const artists = await Artist.create([
            { first_name: 'Gorillaz', last_name: '', birth_date: new Date('1998-03-26'), country: 'UK', image: '' },
            { first_name: 'Charli', last_name: 'XCX', birth_date: new Date('1992-08-02'), country: 'UK', image: '' },
            { first_name: 'Skepta', last_name: '', birth_date: new Date('1982-09-19'), country: 'UK', image: '' },
            { first_name: 'Vince', last_name: 'Staples', birth_date: new Date('1993-07-02'), country: 'USA', image: '' },
            { first_name: 'Kanye', last_name: 'West', birth_date: new Date('1977-06-08'), country: 'USA', image: '' },
            { first_name: 'Kendrick', last_name: 'Lamar', birth_date: new Date('1987-06-17'), country: 'USA', image: '' },
            { first_name: 'Aphex', last_name: 'Twin', birth_date: new Date('1971-08-18'), country: 'UK', image: '' },
            { first_name: 'Westside', last_name: 'Gunn', birth_date: new Date('1982-07-27'), country: 'USA', image: '' },
            { first_name: 'Mac', last_name: 'Miller', birth_date: new Date('1992-01-19'), death_date: new Date('2018-9-7'), country: 'USA', image: '' },
            { first_name: 'Linkin', last_name: 'Park', country: 'USA', image: '' },
        ]);

        // Create albums
        await Album.create([
            { title: 'Demon Days', release_date: new Date('2005-04-11'), artist: artists[0]._id, label: labels[0]._id, genre: genres[0]._id, image: 'https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG' },
            { title: 'Swimming', release_date: new Date('2018-08-3'), artist: artists[8]._id, label: labels[1]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Mac_Miller_-_Swimming.png' },
            { title: 'Konnichiwa', release_date: new Date('2016-05-06'), artist: artists[2]._id, label: labels[8]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/0/08/Konnichiwa_by_Skepta_cover.jpg' },
            { title: 'Big Fish Theory', release_date: new Date('2017-06-23'), artist: artists[3]._id, label: labels[7]._id, genre: genres[4]._id, image: 'https://i1.sndcdn.com/artworks-cc041f23-821d-428f-b7e1-adf06bb2e40f-0-t500x500.jpg' },
            { title: 'The Life of Pablo', release_date: new Date('2016-02-14'), artist: artists[4]._id, label: labels[7]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/4/4d/The_life_of_pablo_alternate.jpg' },
            { title: 'DAMN.', release_date: new Date('2017-04-14'), artist: artists[5]._id, label: labels[6]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png' },
            { title: 'Selected Ambient Works 85-92', release_date: new Date('1992-04-20'), artist: artists[6]._id, label: labels[9]._id, genre: genres[5]._id, image: 'https://upload.wikimedia.org/wikipedia/en/8/82/Selected_Ambient_Works_85-92.png' },
            { title: 'Pray for Paris', release_date: new Date('2020-04-17'), artist: artists[7]._id, label: labels[5]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/3/36/Prayers_for_paris.jpg' },
            { title: 'Plastic Beach', release_date: new Date('2010-03-08'), artist: artists[0]._id, label: labels[1]._id, genre: genres[1]._id, image: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Plasticbeach452.jpg' },
            { title: 'How I`m Feeling Now', release_date: new Date('2020-5-15'), artist: artists[1]._id, label: labels[2]._id, genre: genres[1]._id, image: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Charli_XCX_-_How_I%27m_Feeling_Now.png' },
            { title: 'Ignorance Is Bliss', release_date: new Date('2019-05-31'), artist: artists[2]._id, label: labels[8]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Skepta_-_Ignorance_Is_Bliss.png' },
            { title: 'FM!', release_date: new Date('2018-11-02'), artist: artists[3]._id, label: labels[7]._id, genre: genres[7]._id, image: 'https://upload.wikimedia.org/wikipedia/en/6/69/Vince_Staples_FM.jpg' },
            { title: 'Ye', release_date: new Date('2018-06-01'), artist: artists[4]._id, label: labels[7]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/7/74/Ye_album_cover.jpg' },
            { title: 'good kid, m.A.A.d city', release_date: new Date('2012-10-22'), artist: artists[5]._id, label: labels[6]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/c/ce/KendrickLamarGKMCDeluxe.jpg' },
            { title: 'Syro', release_date: new Date('2014-09-22'), artist: artists[6]._id, label: labels[4]._id, genre: genres[5]._id, image: 'https://upload.wikimedia.org/wikipedia/en/9/99/Aphex_twin_syro.jpg' },
            { title: 'And Then You Pray for Me', release_date: new Date('2023-10-13'), artist: artists[7]._id, label: labels[5]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/a/ad/And_Then_You_Pray_for_Me.jpg' },
            { title: 'Gorillaz', release_date: new Date('2001-03-26'), artist: artists[0]._id, label: labels[0]._id, genre: genres[0]._id, image: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Gorillaz_2001_album.png' },
            { title: 'Brat', release_date: new Date('2024-06-07'), artist: artists[1]._id, label: labels[1]._id, genre: genres[5]._id, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Charli_XCX_-_Brat_%28album_cover%29.png/1024px-Charli_XCX_-_Brat_%28album_cover%29.png' },
            { title: 'Meteora', release_date: new Date('2003-03-25'), artist: artists[9]._id, label: labels[1]._id, genre: genres[0]._id, image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Linkin_Park_Meteora_Album_Cover.jpg' },
            { title: 'The Divine Feminine', release_date: new Date('2016-09-16'), artist: artists[8]._id, label: labels[1]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Mac_Miller_-_The_Divine_Feminine.png' },
            { title: 'Yeezus', release_date: new Date('2013-06-18'), artist: artists[4]._id, label: labels[7]._id, genre: genres[4]._id, image: 'https://cdn.thenet.ng/wp-content/uploads/2013/06/Kanye-West-Yeezus-cover-art.jpg' },
            { title: 'To Pimp a Butterfly', release_date: new Date('2015-03-15'), artist: artists[5]._id, label: labels[6]._id, genre: genres[4]._id, image: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png' },
            { title: 'Drukqs', release_date: new Date('2001-10-22'), artist: artists[6]._id, label: labels[4]._id, genre: genres[5]._id, image: 'https://upload.wikimedia.org/wikipedia/en/f/f0/Drukqs_%28Front_Cover%29.png' },
            { title: 'Supreme Blientele', release_date: new Date('2018-06-22'), artist: artists[7]._id, label: labels[5]._id, genre: genres[4]._id, image: 'https://media.pitchfork.com/photos/652ddd1d4025c777515d3963/master/pass/Westside-Gunn-Supreme-Blientele.jpg' }
        ]);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedDB();