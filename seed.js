const mongoose = require('mongoose');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Genre = require('./models/Genre');
const Label = require('./models/Label');
const Format = require('./models/Format');
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
        await Format.deleteMany({});

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
            { name: 'Columbia', founded: 1888, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Columbia_Records_Colored_Logo.svg/1024px-Columbia_Records_Colored_Logo.svg.png'},
            { name: 'Warner Bros.', founded: 1958, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Warner_Records_%282019_Logo%29.svg/1280px-Warner_Records_%282019_Logo%29.svg.png' },
            { name: 'Atlantic', founded: 1947, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Atlantic_Records_box_logo_%28colored%29.svg/1280px-Atlantic_Records_box_logo_%28colored%29.svg.png' },
            { name: 'Sony Music', founded: 1929, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Sony_Music_Entertainment_Logo_2023.svg/1024px-Sony_Music_Entertainment_Logo_2023.svg.png' },
            { name: 'Wrap', founded: 1989, image:'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Warp_Records_logo.svg/1024px-Warp_Records_logo.svg.png' },
            { name: 'Griselda Records', founded: 2012, image:'https://bestteestore.net/wp-content/uploads/2022/08/Official-Griselda-Records-shirt.png' },
            { name: 'TDE', founded: 2004, image:'https://txdxe.com/cdn/shop/files/TDE_NOBARS_BLK_3.png?v=1672969130&width=500' },
            { name: 'Def Jam', founded: 1984, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Def_Jam_Recordings.svg/800px-Def_Jam_Recordings.svg.png' },
            { name: 'Boy Better Know', founded: 2005, image:'https://upload.wikimedia.org/wikipedia/commons/a/a7/BBK_transparent.png' },
            { name: 'R&S Records', founded: 1983, image:'https://upload.wikimedia.org/wikipedia/en/thumb/d/de/R%26S_Records_logo.svg/1280px-R%26S_Records_logo.svg.png' },
        ]);

         //create artists
         const artists = await Artist.create([
            { first_name: 'Gorillaz', last_name: '', birth_date: new Date('1998-03-26'), country: 'UK', image: 'https://marquettewire.org/wp-content/uploads/2017/05/904342c3abd7566a594458c0e8379e73.1000x750x1.jpg' },
            { first_name: 'Charli', last_name: 'XCX', birth_date: new Date('1992-08-02'), country: 'UK', image: 'https://i.guim.co.uk/img/media/dcf122792489bf287f4d6e8e845895c0fe933b9c/475_219_3196_1917/master/3196.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d8593327407b79a0000f31da68642ec5' },
            { first_name: 'Skepta', last_name: '', birth_date: new Date('1982-09-19'), country: 'UK', image: 'https://www.pohodafestival.sk/uploads/artist/detail/skepta.1701720130.png' },
            { first_name: 'Vince', last_name: 'Staples', birth_date: new Date('1993-07-02'), country: 'USA', image: 'https://npr.brightspotcdn.com/dims3/default/strip/false/crop/2048x1536+0+100/resize/2048x1536!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F91%2F38%2F5295780e4e878431daea54ed8280%2Fvince-staples.jpg' },
            { first_name: 'Kanye', last_name: 'West', birth_date: new Date('1977-06-08'), country: 'USA', image: 'https://preview.redd.it/do-i-look-like-kanye-here-is-a-picture-of-him-v0-dnalj3nafa1c1.jpg?width=640&crop=smart&auto=webp&s=f33324bb78d5dc2c00275d157d4ba689925d53c0' },
            { first_name: 'Kendrick', last_name: 'Lamar', birth_date: new Date('1987-06-17'), country: 'USA', image: 'https://publish.purewow.net/wp-content/uploads/sites/2/2023/01/kendrick-lamar-net-worth-4.jpg?resize=720%2C780' },
            { first_name: 'Aphex', last_name: 'Twin', birth_date: new Date('1971-08-18'), country: 'UK', image: 'https://res.cloudinary.com/electronic-beats/c_fit,q_auto,f_auto,w_1920/stage/uploads/2013/08/aphex-twin-electronic-beats.jpg' },
            { first_name: 'Westside', last_name: 'Gunn', birth_date: new Date('1982-07-27'), country: 'USA', image: 'https://www.rollingstone.com/wp-content/uploads/2023/10/WESTSIDE-GUNN-INTERVIEW.jpg?w=1581&h=1054&crop=1' },
            { first_name: 'Mac', last_name: 'Miller', birth_date: new Date('1992-01-19'), death_date: new Date('2018-9-7'), country: 'USA', image: 'https://i.scdn.co/image/ab6761610000e5ebed3b89aa602145fde71a163a' },
            { first_name: 'Linkin', last_name: 'Park', country: 'USA', image: 'https://m.media-amazon.com/images/I/916P80n1OgL._AC_UF894,1000_QL80_.jpg' },
        ]);

        //create albums
        const album = await Album.create([
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

        //create format
        const formats = await Format.create([ 
            { album: album[0]._id, format: 'Vinyl', price: 2499, stock: 20, barcode: '1000000000001', image: 'https://i.ebayimg.com/images/g/tf8AAOSwRZRj42sI/s-l960.jpg', }, 
            { album: album[1]._id, format: 'CD', price: 1299, stock: 50, barcode: '1000000000002', image: 'https://images.urbndata.com/is/image/UrbanOutfitters/65721466_001_m?$xlarge$&fit=constrain&qlt=80&wid=640', }, 
            { album: album[2]._id, format: 'Digital', price: 799, stock: 100, barcode: '1000000000003', image: 'https://i1.sndcdn.com/artworks-zVhd8oU0jai4-0-t500x500.jpg', }, 
            { album: album[3]._id, format: 'Cassette', price: 1599, stock: 25, barcode: '1000000000004', image: 'https://media-assets.grailed.com/prd/listing/12412186/8552855589824bb49c5a83fe2b9ef187', }, 
            { album: album[4]._id, format: 'Vinyl', price: 2999, stock: 10, barcode: '1000000000005', image: 'https://saintmarierecords.com/cdn/shop/products/kanye-west-the-life-of-pablo-00000011519-vinyl-428614_800x.jpg?v=1687240282', }, 
            { album: album[5]._id, format: 'CD', price: 1499, stock: 35, barcode: '1000000000006', image: 'https://recordstore.co.uk/cdn/shop/files/SharedImage-114868.png?v=1714680367', }, 
            { album: album[6]._id, format: 'Vinyl', price: 2599, stock: 15, barcode: '1000000000007', image: 'https://cdn11.bigcommerce.com/s-p66uh2e57r/images/stencil/1280x1280/products/32628/43580/Aphex_Twin_Selected_Ambient_Works_2LP_black_vinyl_expanded__39543.1660726742.jpg?c=1', }, 
            { album: album[7]._id, format: 'Digital', price: 699, stock: 100, barcode: '1000000000008', image: 'https://upload.wikimedia.org/wikipedia/en/3/36/Prayers_for_paris.jpg', },
            { album: album[8]._id, format: 'Cassette', price: 1399, stock: 25, barcode: '1000000000009', image: 'https://i.discogs.com/oeeMLVxK-I0-HwBghyYlxe670wEmIcR7IrjCi4bz5y8/rs:fit/g:sm/q:90/h:600/w:587/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1NDQ4/NTM2LTE2NzA4OTQ5/NDItOTA0MS5qcGVn.jpeg', }, 
            { album: album[9]._id, format: 'CD', price: 1299, stock: 30, barcode: '1000000000010', image: 'https://i.ytimg.com/vi/DrkFI74d14Y/maxresdefault.jpg', }, 
            { album: album[10]._id, format: 'Vinyl', price: 2099, stock: 10, barcode: '1000000000011', image: 'https://thesoundofvinyl.com/cdn/shop/products/SharedImage-122282_a4fbc380-22d5-49a2-ab1e-bb5661086b83.png?v=1685628401', }, 
            { album: album[11]._id, format: 'CD', price: 1199, stock: 20, barcode: '1000000000012', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2itLsy06eUFatGfnYCo1n8DcR5whuf2Xskw&s', }, 
            { album: album[12]._id, format: 'Vinyl', price: 2599, stock: 15, barcode: '1000000000013', image: 'https://i5.walmartimages.com/asr/7d71ea95-03a6-499c-ba1f-451935804e49.6c7528c59171a58a80d186eac4b65a80.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', }, 
            { album: album[13]._id, format: 'Digital', price: 799, stock: 100, barcode: '1000000000014', image: 'https://example.com/digital_good_kid_maad_city.jpg', }, 
            { album: album[14]._id, format: 'CD', price: 1599, stock: 30, barcode: '1000000000015', image: 'https://img.merchbar.com/product/cdified/upc/47/801061024727.jpg?q=40&w=1400', }, 
            { album: album[15]._id, format: 'Vinyl', price: 2999, stock: 10, barcode: '1000000000016', image: 'https://i.ebayimg.com/images/g/pMMAAOSwiLZlHaJc/s-l1200.jpg', }, 
            { album: album[16]._id, format: 'Cassette', price: 1199, stock: 15, barcode: '1000000000017', image: 'https://i.discogs.com/I0b2TfdTmj2bfHwydK67MtgQG3xKvZI2qQFPyUmY4Dc/rs:fit/g:sm/q:90/h:407/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNzQz/NTAxLTE1NDI1Mjgz/NjItMjgzOC5qcGVn.jpeg', }, 
            { album: album[17]._id, format: 'Digital', price: 699, stock: 100, barcode: '1000000000018', image: 'https://external.webstorage.gr/mmimages/image/27/7/55/63/0075678611698-560x560.jpg', }, 
            { album: album[18]._id, format: 'Vinyl', price: 2599, stock: 20, barcode: '1000000000019', image: 'https://store.warnermusic.ca/cdn/shop/files/Meteora_Splatter_Pack_Shot_1024x1024.jpg?v=1717601317', }, 
            { album: album[19]._id, format: 'CD', price: 1499, stock: 40, barcode: '1000000000020', image: 'https://static.wixstatic.com/media/54fc53_f08030ed03fd4c37bf768c709ab28691~mv2.jpg/v1/fill/w_560,h_559,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/54fc53_f08030ed03fd4c37bf768c709ab28691~mv2.jpg', }, 
            { album: album[20]._id, format: 'Digital', price: 799, stock: 100, barcode: '1000000000021', image: 'https://cdn.thenet.ng/wp-content/uploads/2013/06/Kanye-West-Yeezus-cover-art.jpg', }, 
            { album: album[21]._id, format: 'Vinyl', price: 2799, stock: 10, barcode: '1000000000022', image: 'https://cdn11.bigcommerce.com/s-7fd99jwy75/images/stencil/1280x1280/products/6293/15942/kendrick-lamar-to-pimp-a-butterfly-vinyl-rapbay__47737.1721069297.jpg?c=1', }, 
            { album: album[22]._id, format: 'Cassette', price: 1299, stock: 20, barcode: '1000000000023', image: 'https://i.discogs.com/9VPyb0DfoGoOhQYzFR5EBo7FdW2gGZYdAYl5bmMufHY/rs:fit/g:sm/q:90/h:600/w:375/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg3NzUw/OTMtMTQ2ODUxMTEw/MS04ODYyLmpwZWc.jpeg', }, 
            { album: album[23]._id, format: 'Vinyl', price: 2299, stock: 10, barcode: '1000000000024', image: 'https://f4.bcbits.com/img/0013869994_71.jpg', }, ]);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedDB();