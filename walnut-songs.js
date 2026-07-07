// ════════════════════════════════════════════════════════════
//  WALNUT SONG — เนื้อเพลง + วาด/โน้ต/สติกเกอร์
//  ข้อมูลเพลงดึงมาจาก ~/Claude/Projects/Lyrics (Walnut Songbook เดิม)
//  Layout/font rules ตาม lyrics-formatter skill (A4, tiered font size)
// ════════════════════════════════════════════════════════════

const SONGS = [
  {"id":"1901-phoenix","titleEn":"1901","titleTh":"", "artistEn":"Phoenix","artistTh":"","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Counting all different ideas drifting away","Past and present they don't matter","Now the future's sorted out","Watch her moving in elliptical patterns","Think it's not what you say","What you say is way too complicated","For a minute thought I couldn't tell how to fall out"]},{"type":"chorus","num":null,"repeat":false,"lines":["It's twenty seconds 'til the last call","Going hey hey hey hey hey hey","Lie down you know it's easy","Like we did it over summer long","And I'll be anything you ask and more","Going hey hey hey hey hey hey hey","It's not a miracle we needed","And no I wouldn't let you think so"]},{"type":"bridge","num":null,"repeat":false,"lines":["Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it"]},{"type":"verse","num":2,"repeat":false,"lines":["Girlfriend, oh your girlfriend is drifting away","Past and present 1855-1901","Watch them built up a material tower","Think it's not gonna stay anyway","I think it's overrated","For a minute thought I couldn't tell how to fall out"]},{"type":"chorus","num":null,"repeat":true,"lines":["It's twenty seconds 'til the last call","Going hey hey hey hey hey hey","Lie down you know it's easy","Like we did it over summer long","And I'll be anything you ask and more","Going hey hey hey hey hey hey hey","It's not a miracle we needed","And no I wouldn't let you think so"]},{"type":"outro","num":null,"repeat":false,"lines":["Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it"]}]},
  {"id":"a-whole-new-world-aladdin","titleEn":"A Whole New World","titleTh":"","artistEn":"Aladdin (Disney)","artistTh":"","artistIcon":"🪄","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I can show you the world","Shining, shimmering, splendid","Tell me, princess, now when did","You last let your heart decide?"]},{"type":"verse","num":2,"repeat":false,"lines":["I can open your eyes","Take you wonder by wonder","Over sideways and under","On a magic carpet ride"]},{"type":"chorus","num":null,"repeat":false,"lines":["A whole new world","A new fantastic point of view","No one to tell us \"No\"","Or where to go","Or say we're only dreaming","A whole new world","A dazzling place I never knew","But now from way up here","It's crystal clear","That now I'm in a whole new world with you"]},{"type":"verse","num":3,"repeat":false,"lines":["Unbelievable sights","Indescribable feeling","Soaring, tumbling, freewheeling","Through an endless diamond sky"]},{"type":"chorus","num":null,"repeat":false,"lines":["A whole new world","Don't you dare close your eyes","A hundred thousand things to see","Hold your breath - it gets better","I'm like a shooting star","I've come so far","I can't go back to where I used to be","A whole new world","With new horizons to pursue","I'll chase them anywhere","There's time to spare","Let me share this whole new world with you"]},{"type":"bridge","num":null,"repeat":false,"lines":["A whole new world"]},{"type":"chorus","num":null,"repeat":false,"lines":["(A whole new world)","A new fantastic point of view","No one to tell us \"No\"","Or where to go","Or say we're only dreaming"]},{"type":"chorus","num":null,"repeat":false,"lines":["A whole new world","Every turn a surprise","With new horizons to pursue","Every moment red-letter","I'll chase them anywhere","There's time to spare","I'll chase them anywhere","There's time to spare","Let me share this whole new world with you"]},{"type":"outro","num":null,"repeat":false,"lines":["A whole new world","A whole new world","That's where we'll be","That's where we'll be","A thrilling chase","A wondrous place","For you and me"]}]},
  {"id":"the-only-exception-paramore","titleEn":"The Only Exception","titleTh":"","artistEn":"Paramore","artistTh":"","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["When I was younger I saw my daddy cry","And curse at the wind","He broke his own heart and I watched","As he tried to reassemble it","And my momma swore that she would","Never let herself forget","And that was the day that I promised","I'd never sing of love if it does not exist"]},{"type":"chorus","num":null,"repeat":false,"lines":["But darlin', you are the only exception","You are the only exception","You are the only exception","You are the only exception"]},{"type":"verse","num":2,"repeat":false,"lines":["Maybe I know somewhere deep in my soul","That love never lasts","And we've got to find other ways to make it alone","Keep a straight face","And I've always lived like this","Keeping a comfortable, distance","And up until now I had sworn to myself that I'm content","With loneliness"]},{"type":"chorus","num":null,"repeat":false,"lines":["Because none of it was ever worth the risk","But you are the only exception","You are the only exception","You are the only exception","You are the only exception"]},{"type":"bridge","num":null,"repeat":false,"lines":["I've got a tight grip on reality","But I can't let go of what's in front of me here","I know you're leaving in the morning when you wake up","Leave me with some kind of proof it's not a dream, oh"]},{"type":"chorus","num":null,"repeat":true,"lines":["You are the only exception","You are the only exception","You are the only exception","You are the only exception"]},{"type":"outro","num":null,"repeat":false,"lines":["I'm on my way to believing","Oh, and I'm on my way to believing"]}]},
  {"id":"last-hope-paramore","titleEn":"Last Hope","titleTh":"","artistEn":"Paramore","artistTh":"","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I don't even know myself at all","I thought I would be happy by now","The more I try to push it","I realise - gotta let go of control"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["Gotta let it happen","Gotta let it happen","Gotta let it happen","Just let it happen"]},{"type":"chorus","num":null,"repeat":false,"lines":["It's just a spark","But it's enough to keep me going","And when it's dark out, no one's around","It keeps glowing"]},{"type":"verse","num":2,"repeat":false,"lines":["Every night I try my best to dream","Tomorrow makes it better","Then I wake up to the cold reality","And not a thing has changed","But it will happen"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["Gotta let it happen","Gotta let it happen","Gotta let it happen"]},{"type":"chorus","num":null,"repeat":true,"lines":["It's just a spark","But it's enough to keep me going","And when it's dark out, no one's around","It keeps glowing"]},{"type":"chorus","num":null,"repeat":true,"lines":["It's just a spark","But it's enough to keep me going","And when it's dark out, no one's around","It keeps glowing"]},{"type":"bridge","num":null,"repeat":false,"lines":["And the salt in my wounds isn't burning anymore than it used to","It's not that I don't feel the pain, it's just I'm not afraid of hurting anymore","And the blood in these veins isn't pumping any less than it ever has","And that's the hope I have, the only thing I know that's keeping me alive","Alive"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["Gotta let it happen","Gotta let it happen","Gotta let it happen","Gotta let it happen","Gotta let it happen","Gotta let it happen","Gotta let it happen","Gotta let it happen"]},{"type":"chorus","num":null,"repeat":false,"lines":["It's just a spark","But it's enough to keep me going","(So if I let go of control now, I can be strong)","And when it's dark out, no one's around","It keeps glowing"]},{"type":"chorus","num":null,"repeat":false,"lines":["It's just a spark","But it's enough to keep me going","(So if I keep my eyes closed, with nobody home)","And when it's dark out, no one's around","It keeps glowing"]},{"type":"outro","num":null,"repeat":false,"lines":["Ahhh","Ahhh","Ahhh","Ahhh","Ohhh","Ohhh"]}]},
  {"id":"ทำได้เพียง-25hours","titleEn":"Tham Dai Piang","titleTh":"ทำได้เพียง","artistEn":"25 Hours","artistTh":"","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["นานกว่าจะทำใจ","กว่าจะเรียนรู้มันเป็นอย่างไร","รักของเธอกับฉันมันไม่ง่าย","เมื่อวันเวลา","ที่คอยสั่งสอนให้เราเข้าใจ","มันตัดสินให้ต้องลา"]},{"type":"chorus","num":null,"repeat":false,"lines":["ฉันคงไม่โทษที่เธอไป","เพราะว่าเข้าใจตลอดมา","หมดเวลาแล้วเธอคงต้องไป","แต่สิ่งที่เหลือในใจยังอยู่","คือความคิดถึงที่เธอนั้นไม่รู้","พูดไม่ได้","ทำได้เพียงแค่คิดถึงเธอ"]},{"type":"verse","num":2,"repeat":false,"lines":["ยอมอยู่กับความจริง","แต่จะไม่ทิ้งเรื่องราวที่ดี","ฉันจะมีเธอไว้ในหัวใจ","อยู่กับเวลา","ที่มันยังหมุนให้ก้าวต่อไป","แม้ต้องเหงาสักเท่าไร"]},{"type":"chorus","num":null,"repeat":true,"lines":["ฉันคงไม่โทษที่เธอไป","เพราะว่าเข้าใจตลอดมา","หมดเวลาแล้วเธอคงต้องไป","แต่สิ่งที่เหลือในใจยังอยู่","คือความคิดถึงที่เธอนั้นไม่รู้","พูดไม่ได้","ทำได้เพียงแค่คิดถึงเธอ"]},{"type":"chorus","num":null,"repeat":false,"lines":["ทำได้เพียงแค่คิดถึงเธอ (ฮ้า ฮ้า ฮ้า)","ฉันคงไม่โทษที่เธอไป (ฮ้า)","เพราะว่าเข้าใจตลอด","และยังเข้าใจตลอดมา (ฮา)","หมดเวลาแล้วเธอคงต้องไป","แต่สิ่งที่เหลือในใจยังอยู่","คือความคิดถึงที่เธอนั้นไม่รู้","พูดไม่ได้","ทำได้เพียงแค่คิดถึงเธอ (ฮ้า)"]},{"type":"outro","num":null,"repeat":false,"lines":["แต่สิ่งที่เหลือในใจยังอยู่ (ฮ้า)","คือความคิดถึงที่เธอนั้นไม่รู้ (ฮ้า)","พูดไม่ได้","ทำได้เพียงแค่คิดถึงเธอ"]}]},
  {"id":"สภาวะหัวใจล้มเหลวเฉียบพลัน-sweetmullet","titleEn":"Saphawa Hua Jai Lom Leo Chiabplan","titleTh":"สภาวะหัวใจล้มเหลวเฉียบพลัน","artistEn":"Sweet Mullet","artistTh":"สวีทมัลเล็ต","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["ก็เคยเห็นใครบางคนมีน้ำตาคุกเข่า","เมื่อความรักที่จริงใจพังทลาย","เขาดูอ่อนแอและช่างน่าอาย","จะร้องไปเพื่ออะไร"]},{"type":"verse","num":2,"repeat":false,"lines":["ก็เคยนึกว่าเราเองอยู่เหนือใครคนอื่น","ก็เคยคิดว่าใจเราจะทนไหว","จนวันที่เธอได้พบใครใหม่","วันที่เธอจะทิ้งกัน"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["เพียงแค่สายตาของเธอ","จ้องมองฉันก็ช้ำใจ","อย่าได้ไหม โปรดจงหันไปจากฉัน","ก่อนที่น้ำตาจะไหล"]},{"type":"chorus","num":null,"repeat":false,"lines":["ก่อนที่ฉันยืนไม่ไหว (ไม่ไหว)","ก่อนที่ฉันจะหมดลมหายใจ","หมดแรงจะก้าวไป","ทำอย่างไรเมื่อไร้เธออย่างนี้","เมื่อเธอจะจากฉันไป"]},{"type":"verse","num":3,"repeat":false,"lines":["อาจจะรู้เมื่อสายไป ว่ารักเธอเท่าไหร่","เมื่อเจ็บช้ำจนน้ำตารินออกมา","ไม่อยากอ่อนแอแต่ว่าตามใจ","มันเหมือนใครมาทิ่มแทง"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["ยิ่งมีสายตาของเธอ","จ้องมองฉันยิ่งช้ำใจ","อย่าได้ไหม โปรดจงหันไปจากฉัน","ในตอนนี้","ก่อนที่น้ำตาจะไหล"]},{"type":"chorus","num":null,"repeat":false,"lines":["ก่อนที่ฉันยืนไม่ไหว","ก่อนที่ฉันจะหมดลมหายใจ","หมดแรงจะก้าวไป","ทำอย่างไรเมื่อไร้เธออย่างนี้"]},{"type":"bridge","num":null,"repeat":false,"lines":["อยากจะขอเธอสักครั้ง","อย่ามองฉันในตอนนี้","ภาพที่เห็นมันอาจดูไม่ดี","คนอ่อนแอที่ตรงนี้","ยังคงร้องไห้ไม่หยุดสักที","เมื่อเธอมาจากฉันไป"]},{"type":"chorus","num":null,"repeat":false,"lines":["ก่อนที่น้ำตาจะไหล","ก่อนที่ฉันยืนไม่ไหว","ก่อนที่ฉันจะหมดลมหายใจ","หมดแรงจะก้าวไป","ทำอย่างไรเมื่อไร้เธออย่างนี้"]},{"type":"bridge","num":null,"repeat":true,"lines":["อยากจะขอเธอสักครั้ง (ฮ้า ฮา)","อย่ามองฉันในตอนนี้ (ฮ้า ฮา)","ภาพที่เห็นมันอาจดูไม่ดี","คนอ่อนแอที่ตรงนี้","ยังคงร้องไห้ไม่หยุดสักที","เมื่อเธอมาจากฉันไป"]},{"type":"outro","num":null,"repeat":false,"lines":["ก่อนที่น้ำตาจะไหล","ก่อนที่ฉันยืนไม่ไหว","ก่อนที่ฉันจะหมดลมหายใจ","ขอเธออย่าจากฉันไป"]}]},
  {"id":"คู่ชีวิต-cocktail","titleEn":"Koo Cheewit","titleTh":"คู่ชีวิต","artistEn":"Cocktail","artistTh":"ค็อกเทล","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["เธอคือทุกสิ่ง ในความจริงในความฝัน","คือทุกอย่างเหมือนใจต้องการ","เธอเป็นนิทาน ที่ฉันอ่าน ก่อนหลับตาและนอนฝัน","เธอคือหัวใจ ไม่ว่าใครไม่อาจเทียมเทียบเท่าเธอ","ช่างโชคดีที่เจอ ได้ตกหลุมรักเธอ","ได้มีเธอ เคียงข้างกัน"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["คงจะมีเพียงเธอทำให้โลกนั้นหยุดหมุน เพียงเธอสบตาฉัน","คงจะมีเพียงเธอที่หยุดหัวใจของฉันไว้ตรงนี้ ตรงที่เธอ"]},{"type":"chorus","num":null,"repeat":false,"lines":["เธอเพียงคนเดียวและเพียงเธอที่ต้องการ","ฉันจะทำทุกๆ ทางด้วยวิญญาณและหัวใจ","นั่นคือฉันจะรักเธอไม่ว่าเป็นเมื่อไรสถานใด","ทั้งหัวใจฉันมีเธอเพียงคนเดียว"]},{"type":"verse","num":2,"repeat":false,"lines":["เธอคือรักจริง ฉันยอมทิ้งทุกๆ อย่างเพียงเพื่อเธอ","ดั่งฟ้าให้มาเจอ ให้เธอคู่กับฉัน","ให้เราได้เดินเคียงข้างกันนับจากนี้"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["คงจะมีเพียงเธอทำให้โลกนั้นหยุดหมุน เพียงเธอสบตาฉัน","คงจะมีเพียงเธอที่หยุดหัวใจของฉันไว้ตรงนี้ ตรงที่เธอ"]},{"type":"chorus","num":null,"repeat":true,"lines":["เธอเพียงคนเดียวและเพียงเธอที่ต้องการ","ฉันจะทำทุกๆ ทางด้วยวิญญาณและหัวใจ","นั่นคือฉันจะรักเธอไม่ว่าเป็นเมื่อไรสถานใด","ทั้งหัวใจฉันมีเธอเพียงคนเดียว"]},{"type":"chorus","num":null,"repeat":false,"lines":["เธอเพียงคนเดียวและเพียงเธอที่เฝ้ารอ","ฉันจะขอภาวนา ต่อหน้าฟ้าอันแสนไกล","นั่นคือฉันจะรักเธอไม่ว่าเป็นเมื่อไรสถานใด","ทั้งหัวใจฉันมีเธอเพียงคนเดียว"]},{"type":"bridge","num":null,"repeat":false,"lines":["จะทุกข์หรือยามที่เธอนั้นสุขใจ","ยามป่วยไข้หรือสุขกายสบายดี","ฉันอยู่ตรงนี้และจะมีเพียงเธอทุกวินาที","จะอยู่ใกล้ไม่ห่างไกล จะเคียงชิดไม่ห่างไป ไม่ไปไหน"]},{"type":"chorus","num":null,"repeat":true,"lines":["เธอเพียงคนเดียวและเพียงเธอที่ต้องการ","ฉันจะทำทุกๆ ทางด้วยวิญญาณและหัวใจ","นั่นคือฉันจะรักเธอไม่ว่าเป็นเมื่อไรสถานใด","ทั้งหัวใจฉันมีเธอเพียงคนเดียว"]},{"type":"outro","num":null,"repeat":false,"lines":["เธอเพียงคนเดียวและเพียงเธอ เพียงเธอที่รอ","ฉันขอภาวนาต่อหน้าฟ้าอันแสนไกล","นั่นคือฉันจะรักเธอไม่ว่าเป็นเมื่อไรสถานใด","เกิดชาติไหนฉันมีเธอ มีเธอเพียง คนเดียว"]}]},
  {"id":"กุหลาบ-f-hero","titleEn":"Kularb","titleTh":"กุหลาบ","artistEn":"F.HERO feat. Kantong Thungngoen x SARAN","artistTh":"เอฟ ฮีโร่ feat. ก้านตอง ทุ่งเงิน x สราญ","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["โอท่านกามเทพคงเกลียดขี้หน้าเราแล้วใช่ไหม","เกิดความรักครั้งใดบ่เคยได้ลุ้น","อยากจะเจอเนื้อคู่แต่ดันไปเจอเนื้อตุ๋น","โดนเขาต้มซะจนเกือบเปื่อยอยู่เรื่อยไป"]},{"type":"rap","num":1,"repeat":false,"lines":["เหมือนกามเทพมาลองใจ ให้เจ็บทุกครั้งที่มองใคร","พระเอกนักรักผู้กลายเป็นศพ ตอนจบเหมือนในละครไทย","อยากจะมีใครไว้เกี่ยวดอง ก็ได้แต่เจ็บกระดองใจ","อยากจะบินตอมดอกไม้กับเขา แมงเม่าดันบินเข้ากองไฟ","เคยคิดว่ารักผุดผ่องยองใย แต่ใยพบรักที่มีไว้หลอก","น้ำตาเราต้องไปเช็ดหัวเข่า เพราะเขาให้เรากินน้ำใต้ศอก","ก็เกิดมาเป็นไม้เลื้อย จะหวังหมายปองอะไรไม้ดอก","กุหลาบความรักที่เขาให้กัน ไม่ควรจะหวังอะไรไว้หรอก"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["น้องโดนสวมเขา แต่ว่าเขาได้สวมกอด","น้องเฝ้ากึ้ดฮอด แต่อ้ายกะซ่อดไปฮอดเขา","บ่ว่าสิไปฮักไผ คนที่ช้ำก็คือเฮา","ต้องมาคอยปวดหัวกลุ้ม heart"]},{"type":"chorus","num":null,"repeat":false,"lines":["กุหลาบละเด้อ พอแล้ว ฮักไปช้ำไป","เจ็บมาจนหัวใจเซเว","มาหลอกให้ฮัก แล้วน้องก็โดนเท","หัวใจสิเพ กรมธรรม์บ่คุ้มครอง","กุหลาบดอกนี้ เอาหนามมาแทงหัวใจ","เฮ็ดจั่งใด๋ก็บ่เคยสมหวัง","บอกเจ้าของให้พอ หัวใจมันสิพัง","บ่มีไผฮักก็บ่เป็นหยัง จบเจือ"]},{"type":"rap","num":2,"repeat":false,"lines":["คิดถึงใครบางคนบรรยากาศองศา 50 Fahrenheit","Every day ไม่ใช่วันธรรมดา","เพราะฉันทำทุกทุกวันให้เป็นวัน Valentine","หลัง case โทรศัพท์ฉันเคยมีรูปเธอ","แล้วก็เบอร์คนสำคัญอยู่ข้างใน my mobile","มองนอกหน้าต่างบรรยากาศโคตรจะชิว","ตอนนั้นฟิลเหมือนฉันเดินในทุ่งดอกคาโมมายล์","อาจเป็นเพราะว่าตอนนั้นฉันไม่เคยคิดถาม","เธอจะหลอกให้ฉันรักก็ไม่เคยคิดขวาง","ฉันเคยเข้าใจว่ากุหลาบสวยงาม","พอเวลาผ่านไปทรมานพิษหนาม","รักของเรานั้นเป็นเพียงข้อสันนิษฐาน","ฉันเลยวาดภาพไปไกลเพราะฉันมองฝันนี้หวาน","เพราะเธอเข้ามาเหมือนกับว่าเธอเข้าใจ","ฉันต้องยอมปล่อยเธอไปพร้อมกับคำอธิฐาน","(เพราะได้รู้ว่าความรักไม่ใช่อภินิหาร)"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["น้องโดนสวมเขา แต่ว่าเขาได้สวมกอด","น้องเฝ้ากึ้ดฮอด แต่อ้ายกะซ่อดไปฮอดเขา","บ่ว่าสิไปฮักไผ คนที่ช้ำก็คือเฮา","ต้องมาคอยปวดหัวกลุ้ม heart"]},{"type":"chorus","num":null,"repeat":true,"lines":["กุหลาบละเด้อ พอแล้ว ฮักไปช้ำไป","เจ็บมาจนหัวใจเซเว","มาหลอกให้ฮัก แล้วน้องก็โดนเท","หัวใจสิเพ กรมธรรม์บ่คุ้มครอง","กุหลาบดอกนี้ เอาหนามมาแทงหัวใจ","เฮ็ดจั่งใด๋ก็บ่เคยสมหวัง","บอกเจ้าของให้พอ หัวใจมันสิพัง","บ่มีไผฮักก็บ่เป็นหยัง จบเจือ"]},{"type":"bridge","num":null,"repeat":false,"lines":["กุหลาบแล้วเด้อ พอแล้วความรัก","ไม่หาวิมานองค์อินทร์ใด","จากนี้จะไม่ขอเอาหัวใจไปผูกไว้ตรงข้อตีนใคร","ยอดเขาความรักที่ทุกคนไขว่คว้า","ใครอยากจะปีนก็ปีนไป","ความรัก ความทุกข์ ความสุข ความเศร้า","เธอจะไม่พบฉันอยู่ใน scene ใด"]},{"type":"outro","num":null,"repeat":false,"lines":["กุหลาบดอกนี้ เอาหนามมาแทงหัวใจ","เฮ็ดจั่งใด๋ก็บ่เคยสมหวัง","บอกเจ้าของให้พอ หัวใจมันสิพัง","บ่มีไผฮักก็บ่เป็นหยัง จบเจือ"]}]},
  {"id":"โนบรา-โนราห์-biw-kalyanee","titleEn":"No Bra No Ra","titleTh":"โนบรา-โนราห์","artistEn":"Biw Kalyanee (R Siam)","artistTh":"บิว กัลยาณี อาร์สยาม","artistIcon":"🎤","sections":[{"type":"chorus","num":null,"repeat":false,"lines":["แล้วพี่ก็ลืม พี่ก็ลืมโนรา","ไปเจอะสาวโนบรา สาวโนราเลยจ๋อย","อยู่ดงสายเดี่ยว เกาะเกี่ยวเอวลอย","ทิ้งให้คนคอย นั่งใจลอยน้ำตาคลอ"]},{"type":"verse","num":1,"repeat":false,"lines":["ไยพี่ไม่จำ พี่ไม่จำสัญญา","บอกไม่นานหลบมา ถึงเวลาสู่ขอ","อยู่ในเมืองใหญ่ หาเงินมาให้พอ","หนุ่มเมืองสะตอ ไยหนอลืมสัญญา"]},{"type":"verse","num":2,"repeat":false,"lines":["หนุ่มใต้เขาว่าใจแข็ง","หัวใจเคยแกร่ง ล่ะเหมือนดั่งหินผา","วันนี้ใจกร่อน เมื่อเจอะสาวโนบรา","ทิ้งสาวโนราให้น้ำตาตกใน"]},{"type":"verse","num":3,"repeat":false,"lines":["น้องเจ็บหัวใจ เจ็บหัวใจอย่างแรง","เมื่อพี่มาเปลี่ยนแปลง เสียแรงที่ไว้ใจ","ยิ่งคิดยิ่งเศร้า นั่งกอดเข่าเดียวดาย","สาวโนราปักษ์ใต้ ต้องพ่ายสาวโนบรา"]},{"type":"chorus","num":null,"repeat":true,"lines":["แล้วพี่ก็ลืม พี่ก็ลืมโนรา","ไปเจอะสาวโนบรา สาวโนราเลยจ๋อย","อยู่ดงสายเดี่ยว เกาะเกี่ยวเอวลอย","ทิ้งให้คนคอย นั่งใจลอยน้ำตาคลอ"]},{"type":"verse","num":1,"repeat":true,"lines":["ไยพี่ไม่จำ พี่ไม่จำสัญญา","บอกไม่นานหลบมา ถึงเวลาสู่ขอ","อยู่ในเมืองใหญ่ หาเงินมาให้พอ","หนุ่มเมืองสะตอ ไยหนอลืมสัญญา"]},{"type":"verse","num":2,"repeat":true,"lines":["หนุ่มใต้เขาว่าใจแข็ง","หัวใจเคยแกร่ง ล่ะเหมือนดั่งหินผา","วันนี้ใจกร่อน เมื่อเจอะสาวโนบรา","ทิ้งสาวโนราให้น้ำตาตกใน"]},{"type":"verse","num":3,"repeat":true,"lines":["น้องเจ็บหัวใจ เจ็บหัวใจอย่างแรง","เมื่อพี่มาเปลี่ยนแปลง เสียแรงที่ไว้ใจ","ยิ่งคิดยิ่งเศร้า นั่งกอดเข่าเดียวดาย","สาวโนราปักษ์ใต้ ต้องพ่ายสาวโนบรา"]}]},
  {"id":"ยายแล่ม-kanthai","titleEn":"Yai Laem","titleTh":"ยายแล่ม","artistEn":"Kan Thai (unconfirmed — several artists have versions)","artistTh":"คันไถ (ยังไม่ยืนยัน มีหลายศิลปินร้องเวอร์ชันนี้)","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["ยายแล่มอีตอนสาวสาว","ผิวขาวตาคมสมใจ","ฉันจะเล่ากล่าวตอนย้อนไป","อายุแกได้วัยปิ๊งพอดี"]},{"type":"verse","num":2,"repeat":false,"lines":["พอทุ่มตรงแต่งองค์เยื้องกราย","ชักแถวเรียงราย หมายไปดูของดี","ลมหนาวก็พัดมายามราตรี","ยายแล่มโสภี ก็ออกมาที่แท่นรำ"]},{"type":"verse","num":3,"repeat":false,"lines":["ชีวิตยายแล่มนั้นหนา","ต้องพึ่งพาเสียงเพลงย้อมนำ","ฟังแกเล่าความหลังยังจำ","แกสู้ทนทำเก็บงำมาหลายปี"]},{"type":"verse","num":4,"repeat":false,"lines":["ทุกคืนต้องมายืนละเลง","ร่ายรำทำเพลงด้วยจังหวะดีดี","ยักย้ายส่ายเอวก็มี","ซ้ายทีขวาที จะคืนละกี่สตางค์"]},{"type":"chorus","num":null,"repeat":false,"lines":["บัดนี้ยายแล่มแก่เหลา","ผมยาวสีขาวเก๋าจัง","หมดเรี่ยวแรง เฝ้ารัง","มีลูกคอยนั่งพัดวีเอาใจ","เป็นอาชีพที่ต้องใช้การโชว์","ตั้งแต่เราโตยังหาดูกันไม่ได้","มาดัดแปลงกันแจ๋วแหววสะใจ","ถ้าจะดูก็ไปที่พัทยาพัฒน์พงษ์"]},{"type":"chorus","num":null,"repeat":true,"lines":["บัดนี้ยายแล่มแก่เหลา","ผมยาวสีขาวเก๋าจัง","หมดเรี่ยวแรง เฝ้ารัง","มีลูกคอยนั่งพัดวีเอาใจ","เป็นอาชีพที่ต้องใช้การโชว์","ตั้งแต่เราโตยังหาดูกันไม่ได้","มาดัดแปลงกันแจ๋วแหววสะใจ","ถ้าจะดูก็ไปที่พัทยาพัฒน์พงษ์"]}]},
  {"id":"คิดฮอด-bodyslam","titleEn":"Kid Hod","titleTh":"คิดฮอด","artistEn":"BodySlam","artistTh":"บอดี้สแลม","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["คล้ายจันทราที่อับแสง ล้านดวงดาวมืดมน","คล้ายดังคนเริ่มหมดไฟ","วันที่อาทิตย์ร้อนแรงลาจากฟ้า และไม่เคยหวนกลับ","ใครคนนี้เหมือนไม่อยาก หายใจ"]},{"type":"verse","num":2,"repeat":false,"lines":["โลกใบเดิมที่สดใส ไม่เคยเป็นเหมือนเก่า","ฤดูกาลพลันเปลี่ยนแปร","ไม่มีอีกฝนฟ้าครามงามดอกสวย ไม้งามแห้งเหี่ยว","ขาดความรักไร้กำลัง หัวใจ"]},{"type":"chorus","num":null,"repeat":false,"lines":["เป็นจั๋งใด๋แล้วน้อความฮัก เป็นจั๋งใด๋แล้วน้อความฮัก","ที่เคยหอมเคยกอด คิดฮอดแล้วหนาวหัวใจ","สัญญาไว้ สิมาหมั่นมาหมาย","ไหลผ่านปานขี่ฝ่า ลืมฟ้าไลลอย","บอกให้คอยยังจำได้บ่ คำสัญญายังจำได้บ่","เหงาซำใด๋บ่ท้อ เก็บใจถ่าบ่ถอย","คิดฮอดเด้อ ความฮักแท้ป่านนี้อยู่ไส"]},{"type":"bridge","num":null,"repeat":false,"lines":["และยังคิดถึงเธอนะ อ่ะ อ่ะ อ่ะ อ่ะ","ชีวิตที่มีเธอ","วันคืนเหล่านั้นช่างมีความหมาย อ่ะ อ่ะ อ่ะ อ่ะ","วอนท้องทะเลขอบฟ้าแสนไกล","บอกเธอได้ไหมยังคอย"]},{"type":"verse","num":3,"repeat":false,"lines":["ก็คล้ายเธอลืมไปหมดแล้ว คำสัญญาวันเก่า","ว่าไม่นานคงกลับมา","ต่อให้อีกหมื่นฟ้าไกลกางกั้นไว้รัก ยังเหมือนเก่า","ความคิดถึงไม่เคยจาง หายไป"]},{"type":"chorus","num":null,"repeat":false,"lines":["เป็นจั๋งใด๋แล้วน้อความฮัก เป็นจั๋งใด๋แล้วน้อความฮัก","ที่เคยฝัง เคยฝากฮอยจูบไว้ในหัวใจ","ยามเฮาไกลยังจำได้บ่ แนมดาวยังพ้อหน้ากันอยู่บ่ห่าง","ฟ้าข้างบนเปลี่ยนสีทุกวัน สัญญามั่นคงจำขึ้นใจ","เก็บคำว่าฮักไว้ ถ่าคนไกลบ่น้อ","คิดฮอดเด้อ ความฮักแท้ ป่านนี้เป็นจั๋งใด๋"]},{"type":"bridge","num":null,"repeat":false,"lines":["และยังคิดถึงเธอนะ อ่ะ อ่ะ อ่ะ อ่ะ","วันนี้ไม่มีเธอ","เหตุใดโลกนี้ช่างดูโหดร้าย อ่ะ อ่ะ อ่ะ อ่ะ","สุดท้องทะเล ขอบฟ้าแสนไกล","กลับมาได้ไหมยังคอย"]},{"type":"bridge","num":null,"repeat":false,"lines":["พรุ่งนี้ต้องเดินต่อไป แม้เพียงลำพัง","ชีวิตจะเป็นอย่างไร ขอเพียงความหวัง","โลกยังรอให้เธอ ช่วยเป็นพลัง","แต่งเติมฝันให้ชีวิต งดงามด้วยความรัก","เธอเป็นยังไง บ้าง"]},{"type":"bridge","num":null,"repeat":false,"lines":["อยู่ไสหนอความฮัก โอ้ย","อยู่ไสหนอความฮัก (หายไปไหน)","เป็นยังไงบ้าง บ้าง บ้าง","บ้างหนอ บ้างบ้างหนอ บ้างบ้างหนอ","และ และ และ และ"]},{"type":"bridge","num":null,"repeat":true,"lines":["และยังคิดถึงเธอนะ อ่ะ อ่ะ อ่ะ อ่ะ","วันนี้ไม่มีเธอ","เหตุใดโลกนี้ช่างดูโหดร้าย อ่ะ อ่ะ อ่ะ อ่ะ","สุดท้องทะเล ขอบฟ้าแสนไกล","กลับมาได้ไหมยังคอย"]},{"type":"outro","num":null,"repeat":false,"lines":["กลับมาได้ไหมยังคอย","และยังคิดถึงเพียงเธอ","โอ้ โฮะ โอ โฮะ โอ","โอ้ โฮะ โอ โอ โอ้ย","เป็นจั๋งใด๋น้อความฮัก","โอ้ย โอะ โอ โอ้ ล่ะ โอ้ย","โอะ โอะ โอะ โอะ โอ"]}]},
  {"id":"บรรยากาศ-onlymonday","titleEn":"Banyakat","titleTh":"บรรยากาศ","artistEn":"Only Monday","artistTh":"โอนลี่ มันเดย์","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["อยู่ท่ามกลางคนที่มีอยู่เป็นล้าน","แต่ทำไมหัวใจฉันมันกลับอ้างว้าง","เหมือนว่ารอบตัวที่มันวุ่นวาย","กำลังค่อยค่อยหายไป"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["ร้านที่ฉันเคยพาเธอไปตอนนั้น","ตอนนี้ไม่มีใครมีเพียงแค่ตัวฉัน","กับแก้วที่มันรินบางบาง","มันให้ฉันนั้นคิดถึงเธอ"]},{"type":"chorus","num":null,"repeat":false,"lines":["บรรยากาศเดิมเดิมที่เดิมเดิมทำให้ฉันคิดถึงใคร","อยู่ภายในใจ อยู่ในใจ ยังจดจำทุกเรื่องราว","ภาพนั้นยังคงเป็นเธอ ที่ฉันคงไม่ได้เจอ","ไม่มีทางอีกแล้ว","อยู่กับฉากเดิมเดิมที่เดิมเดิมวนแบบนี้ทุกครั้งไป","อยู่ภายในใจ แค่ในใจ ยังไม่ลืมภาพอดีต","รักนั้นที่เราเคยผ่าน รักนี้ที่ไม่มีทาง","ทำให้ดีกว่านี้"]},{"type":"verse","num":2,"repeat":false,"lines":["นึกเรื่องดีดีที่มีในตอนนั้น","ที่ฉันและเธอเคย เคยเป็นอย่างที่ฝัน","ฉันนั้นโชคดีที่เคยมีเธอ","อยู่ในภาพความทรงจำ"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["โต๊ะที่มันเคยมีเธออยู่ตรงนั้น","ตอนนี้ไม่มีใครมันเป็นแค่ความฝัน","อยู่กับแก้วที่มันรินบางบาง","มันทำให้ฉันนั้นคิดถึงเธอ"]},{"type":"chorus","num":null,"repeat":true,"lines":["บรรยากาศเดิมเดิมที่เดิมเดิมทำให้ฉันคิดถึงใคร","อยู่ภายในใจ อยู่ในใจ ยังจดจำทุกเรื่องราว","ภาพนั้นยังคงเป็นเธอ ที่ฉันคงไม่ได้เจอ","ไม่มีทางอีกแล้ว","อยู่กับฉากเดิมเดิมที่เดิมเดิมวนแบบนี้ทุกครั้งไป","อยู่ภายในใจ แค่ในใจ ยังไม่ลืมภาพอดีต","รักนั้นที่เราเคยผ่าน รักนี้ที่ไม่มีทาง","ทำให้ดีกว่านี้"]},{"type":"chorus","num":null,"repeat":true,"lines":["บรรยากาศเดิมเดิมที่เดิมเดิมทำให้ฉันคิดถึงใคร","อยู่ภายในใจ อยู่ในใจ ยังจดจำทุกเรื่องราว","ภาพนั้นยังคงเป็นเธอ ที่ฉันคงไม่ได้เจอ","ไม่มีทางอีกแล้ว","อยู่กับฉากเดิมเดิมที่เดิมเดิมวนแบบนี้ทุกครั้งไป","อยู่ภายในใจ แค่ในใจ ยังไม่ลืมภาพอดีต","รักนั้นที่เราเคยผ่าน รักนี้ที่ไม่มีทาง","ทำให้ดีกว่านี้ โว้ (นานันนานันนา)"]}]},
  {"id":"ไม่บอกเธอ-bedroomaudio","titleEn":"Mai Bok Ter","titleTh":"ไม่บอกเธอ","artistEn":"Bedroom Audio","artistTh":"เบดรูม ออดิโอ","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["อยากขยับเข้าไปใกล้เธอ","อยากรู้จักตั้งแต่ได้เจอ","ใจฉันสั่นเมื่อได้ยินเสียงเธอ","ตั้งแต่วันแรกเจอก็เผลอเอาไปคิดละเมอ"]},{"type":"verse","num":2,"repeat":false,"lines":["พอรู้จักก็อยากจะทักทาย","แต่พอไม่เจอแล้วใจก็วุ่นวาย","เธอหายไปก็ห่วงเธอแทบตายจะเป็นเช่นไร","ตรงนั้นมีใครดูแลหรือไม่ก็ไม่รู้"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["เกือบลืมหายใจเมื่อเธอเข้ามาใกล้ใกล้","แค่เธอยิ้มมาก็สั่นไปทั้งหัวใจ","อยากจะบอกเธอให้ได้รับรู้ความในใจ"]},{"type":"chorus","num":null,"repeat":false,"lines":["แต่บอกตอนนี้ไม่รู้จะเร็วไปหรือไม่","ก็ยังไม่รู้ว่าเธอคิดเช่นไร","ถ้าบอกคำนั้นแล้วเธอตอบมาว่าไม่ใช่","ถ้าเป็นแบบนี้เธอคงจะเดินหนีไป","ดีพอแล้วที่ได้มีเธออยู่ใกล้ใกล้","ได้ยินเสียงได้คอยดูแลอยู่ไม่ไกล","จะซ่อนความลับเอาไว้ในหัวใจ","มากเพียงไหนฉันจะไม่ยอมพูดไป"]},{"type":"verse","num":3,"repeat":false,"lines":["อยากจะบอกให้เธอได้รู้ใจ","ที่จริงก็อยากจะบอกคำนั้นไป","แต่กลัวเหลือเกินว่าจะต้องเสียใจ","หากเธอรับไม่ได้","เธอคงไม่ยอมให้อภัยกับคำนั้น"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["อึดอัดเหลือเกิน","ต้องเก็บเอาไว้ข้างใน","อึดอัดหัวใจแต่ก็กลัวว่าถ้าพูดไป","กลัวว่าจะต้องเสียใจ"]},{"type":"chorus","num":null,"repeat":true,"lines":["แต่บอกตอนนี้ไม่รู้จะเร็วไปหรือไม่","ก็ยังไม่รู้ว่าเธอคิดเช่นไร","ถ้าบอกคำนั้นแล้วเธอตอบมาว่าไม่ใช่","ถ้าเป็นแบบนี้เธอคงจะเดินหนีไป","ดีพอแล้วที่ได้มีเธออยู่ใกล้ใกล้","ได้ยินเสียงได้คอยดูแลอยู่ไม่ไกล","จะซ่อนความลับเอาไว้ในหัวใจ","มากเพียงไหนฉันจะไม่ยอมพูดไป"]},{"type":"bridge","num":null,"repeat":false,"lines":["มองกันให้ดีเธอก็คงรู้","ในความห่วงใยฉันมีอะไร ซ่อนอยู่","ที่ยังไม่รู้คือเธอนั้นคิดอย่างไร","มองกันให้ดีเธอก็คงจะเห็น","ความจริงที่เป็นว่าฉันคิดอะไร","หนึ่งคำนั้นที่ยังไม่ได้พูดไป","จะเก็บเอาไว้ในวันที่เธอเผยใจ","รอวันนั้นวันที่ฉันแน่ใจ","ว่าวันนี้เธอคิดว่าฉันนั้นใช่","และเธอพร้อมจะฟังความข้างใน"]},{"type":"outro","num":null,"repeat":false,"lines":["จะบอกว่ารักให้เธอได้ยินใกล้ใกล้","บอกว่ารักเธอได้ยินหรือไม่","ถ้ายังไม่ชัดฟังอีกครั้งก็ได้","ได้ยินไหมว่ารักเธอทั้งหัวใจ"]}]},
  {"id":"love-koonsam-supergang","titleEn":"L.O.V.E","titleTh":"","artistEn":"Koon Sam Super Gang","artistTh":"คูณสามซุปเปอร์แก็งค์","artistIcon":"🎤","sections":[{"type":"chorus","num":null,"repeat":false,"lines":["Oh..Baby L","มองทางโน้นไม่มี O","มองทางนี้ไม่เจอ V","มองทางไหนถึงเจอ E","ไหนกันที่เรียก ว่ารัก","อยากจะพบเจอจริง จริง"]},{"type":"verse","num":1,"repeat":false,"lines":["เขาว่ากันมาว่ารักคือการมองตานาน นาน","รักนั้นคือการจูงมือเดินเคียงกันไป","Oh..Love Is Me","Oh..Love Is You"]},{"type":"chorus","num":null,"repeat":true,"lines":["Oh..Baby L","มองทางโน้นไม่มี O","มองทางนี้ไม่เจอ V","มองทางไหนถึงเจอ E","ไหนกันที่เรียก ว่ารัก","อยากจะพบเจอจริง จริง"]},{"type":"bridge","num":null,"repeat":false,"lines":["เธอช่วยหน่อยได้ไหม","อยากจะรัก รักดู สักที","In Love เมื่อไร","ใจคงร้องเป็นเพลงว่า L.O.V.E."]},{"type":"chorus","num":null,"repeat":true,"lines":["Oh..Baby L","มองทางโน้นไม่มี O","มองทางนี้ไม่เจอ V","มองทางไหนถึงเจอ E","ไหนกันที่เรียก ว่ารัก","อยากจะพบเจอจริง จริง"]},{"type":"instrumental","num":null,"repeat":false,"lines":["— ดนตรี...Solo... —"]},{"type":"verse","num":2,"repeat":false,"lines":["รักนั้นคือเราดีใจ","เวลาเรามาเจอกัน","คิดถึงกันในเวลาไม่เจอกันเลย","Oh..Wanna See You","Oh..Missing You"]},{"type":"chorus","num":null,"repeat":true,"lines":["Oh..Baby L","มองทางโน้นไม่มี O","มองทางนี้ไม่เจอ V","มองทางไหนถึงเจอ E","ไหนกันที่เรียก ว่ารัก","อยากจะพบเจอจริง จริง"]},{"type":"bridge","num":null,"repeat":true,"lines":["เธอช่วยหน่อยได้ไหม","อยากจะรัก รักดู สักที","In Love เมื่อไร","ใจคงร้องเป็นเพลงว่า L.O.V.E."]},{"type":"chorus","num":null,"repeat":false,"lines":["มองทางโน้นไม่มี","มองทางนี้ไม่เจอ","มองทางไหนถึงเจอ","ไหนกันที่เรียก ว่ารัก","อยากจะพบเจอจริง จริง"]},{"type":"chorus","num":null,"repeat":true,"lines":["Oh..Baby L","มองทางโน้นไม่มี O","มองทางนี้ไม่เจอ V","มองทางไหนถึงเจอ E","ไหนกันที่เรียก ว่ารัก","อยากจะพบเจอจริง จริง"]},{"type":"outro","num":null,"repeat":false,"lines":["Oh..Baby"]}]},
  {"id":"แสงสุดท้าย-bodyslam","titleEn":"Saeng Sudthai","titleTh":"แสงสุดท้าย","artistEn":"BodySlam","artistTh":"บอดี้สแลม","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["รอนแรมมาเนิ่นนาน เพียงหนึ่งใจ","กับทางที่โรยเอาไว้ด้วยขวากหนาม","ถูกแหลมคมทิ่มแทง","จนมันแทบจะทนไม่ไหว"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["ชีวิต ถ้าไม่ยากเย็นขนาดนั้น","สองมือจะมีเรี่ยวแรงขนาดไหน","แต่หัวใจของคน ยังยืนยันจะไม่ถอดใจ"]},{"type":"chorus","num":null,"repeat":false,"lines":["ในค่ำคืนที่ฟ้านั้นไม่มีดาว อยู่ตรงนี้","แต่ฉันยังคงก้าวไป","ยังคงมีรักแท้","เป็นแสงนำไปในคืนที่หลงทาง"]},{"type":"verse","num":2,"repeat":false,"lines":["วัน เวลาไม่เคยจะหยุดเดิน","อย่างไรเราคงต้องเดินไปกับมัน","เก็บทุกความผิด พลั้งเป็นคำเตือนให้เราเข้าใจ","ว่าชีวิตเริ่มต้นที่คำว่าฝ่าฟัน","ขอเพียงใจเรา เท่านั้นไม่หวั่นไหว","บทชีวิตของเรา เราจะทำให้มีความหมาย"]},{"type":"chorus","num":null,"repeat":false,"lines":["ในค่ำคืนที่ฟ้านั้นไม่มีดาว อยู่ตรงนี้","แต่ฉันยังคงก้าวไป","ยังคงมีรักแท้","เป็นแสงนำไปในคืนที่หลงทาง","และที่ๆ ความฝันนั้นพร้อมเป็นเพื่อนตาย","เส้นทางนี้ ฉันยังมีจุดหมาย","ตราบใดที่ปลายท้องฟ้ามีแสงรำไร","จะไปจนถึงแสงสุดท้าย"]},{"type":"bridge","num":null,"repeat":false,"lines":["ความเดียวดาย ในคืนเหน็บหนาว","แหงนมองฟ้ายังนึกถึงวันเก่า","มันคงชินที่ทางยาวไกล กร่อนหัวใจ","ภาวนา กับความมืดมิด ขอให้รักยังคุ้มครองเราอยู่","เตือนคืนวันให้ใจดวงนี้ ไม่ยอมแพ้"]},{"type":"chorus","num":null,"repeat":false,"lines":["ในค่ำคืนที่ฟ้าท้าทายใจคน อยู่ตรงนี้","และฉันยังคงก้าวไป","ยัง คงมีรักแท้ เป็นแสงนำไปในคืนที่หลงทาง","และที่ๆ ความฝันนั้นพร้อมเป็นเพื่อนตาย","เส้นทางนี้ ฉันยังมีจุดหมาย","ตราบใดที่ปลายท้องฟ้ามีแสงรำไร","จะไปจนถึงแสงสุดท้าย"]},{"type":"outro","num":null,"repeat":false,"lines":["จนถึงแสงสุดท้าย","ตราบใดที่ปลายท้องฟ้า","ตราบ ใดที่ปลายท้องฟ้า"]}]},
  {"id":"ผ้าเช็ดหน้า-triumphs-kingdom","titleEn":"Pha Chet Na","titleTh":"ผ้าเช็ดหน้า","artistEn":"Triumphs Kingdom (also covered by ALLY)","artistTh":"ไทรอัมพ์ส คิงดอม (มีเวอร์ชันคัฟเวอร์โดย แอลลี่)","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["เจอะเธอเมื่อไหร่ในใจมันหวิว","เด็ดดอกไม้ปลิวจนเกลื่อนถนน","เธอน่ารักจนฉันเก็บไปคิดไปฝัน","อยากขอเป็นแฟนด้วยคน"]},{"type":"verse","num":2,"repeat":false,"lines":["หน้าตาของเธอก็หล่อพอใช้","แต่ว่าหัวใจเธอช่างเปี่ยมล้น","เธอเพียบพร้อมไปทุกอย่าง","จนฉันสับสนว่าต้องทำตัวยังไง"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["แล้วก็ไม่กล้าจริงจริงไม่กล้าจริงจริง","ทุกครั้งที่ฉันเจอเธอฉันนั้นไม่กล้าจริงจริง","จะต้องทำท่ายังไง","จะพูดจะเริ่มยังไง ก็ใจฉันมันปิ๊ง"]},{"type":"chorus","num":null,"repeat":false,"lines":["ช่วยเก็บผ้าเช็ดหน้า","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ฉันกลัวใครคว้าไป","ช่วยเก็บผ้าเช็ดหน้า","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ตกลงพร้อมหัวใจ"]},{"type":"verse","num":3,"repeat":false,"lines":["ไม่พูดไม่จาทำท่าเงียบขรึม","ยิ่งเธอเซื่องซึมฉันยิ่งสับสน","อยากให้เธอเห็นผ้าเช็ดหน้า","ที่ทิ้งเอาไว้รอจนหัวใจเวียนวน"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["แล้วก็ไม่กล้าจริงจริงไม่กล้าจริงจริง","ทุกครั้งที่ฉันเจอเธอฉันนั้นไม่กล้าจริงจริง","จะต้องทำท่ายังไง","จะพูดจะเริ่มยังไง ก็ใจฉันมันปิ๊ง"]},{"type":"chorus","num":null,"repeat":true,"lines":["ช่วยเก็บผ้าเช็ดหน้า","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ฉันกลัวใครคว้าไป","ช่วยเก็บผ้าเช็ดหน้า","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ตกลงพร้อมหัวใจ"]},{"type":"bridge","num":null,"repeat":false,"lines":["ไม่อยากทอดสะพาน","แต่รอนานนานก็ไม่ไหวนะ","เจอกันมาตั้งนานแล้ว","ทำไมไม่มองตัวฉันบ้างล่ะ","ตรงนี้ตรงนี้ หยิบสิหยิบสิ","มองเห็นไหมจ๊ะ","อุตส่าห์ทิ้งให้เธอเก็บ","ทำไมไม่เก็บซะทีล่ะคะ"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["แล้วก็ไม่กล้าจริงจริงไม่กล้าจริงจริง","ทุกครั้งที่ฉันเจอเธอฉันนั้นไม่กล้าจริงจริง","จะต้องทำท่ายังไง","จะพูดจะเริ่มยังไง ก็ใจฉันมันปิ๊ง"]},{"type":"chorus","num":null,"repeat":false,"lines":["ช่วยเก็บผ้าเช็ดหน้า (อุ๊)","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ฉันกลัวใครคว้าไป","ช่วยเก็บผ้าเช็ดหน้า","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ตกลงพร้อมหัว"]},{"type":"outro","num":null,"repeat":false,"lines":["ช่วยเก็บผ้าเช็ดหน้า","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ฉันกลัวใครคว้าไป","ช่วยเก็บผ้าเช็ดหน้า","ของฉันหน่อยได้ไหม","เพราะฉันทำมันตก","ตกลงพร้อมหัวใจ"]}]},
  {"id":"golden-huntrx","titleEn":"Golden","titleTh":"","artistEn":"HUNTR/X (KPop Demon Hunters)","artistTh":"","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I was a ghost, I was alone",{"text":"어두워진 앞길속에 (Hah)","sub":"ออดูวอจิน อับกิลโซเก"},"Given the throne, I didn't know how to believe (Hah)","I was the queen that I'm meant to be (Ah)","I lived two lives, tried to play both sides","But I couldn't find my own place (Oh, oh)","Called a problem child 'cause I got too wild",{"text":"But now that's how I'm getting paid, 끝없이 on stage","sub":"กึดอ็อบชี"}]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["I'm done hidin', now I'm shinin'","Like I'm born to be","We dreamin' hard, we came so far","Now I believe"]},{"type":"chorus","num":null,"repeat":false,"lines":["We're goin' up, up, up","It's our moment","You know together we're glowin'","Gonna be, gonna be Golden","Oh, up, up, up","With our voices",{"text":"영원히 깨질 수 없는","sub":"ยองวอนฮี แคจิล ซู ออบนึน"},"Gonna be, gonna be golden"]},{"type":"bridge","num":null,"repeat":false,"lines":["Oh, I'm done hidin', now I'm shinin'","Like I'm born to be","Oh, our time, no fears, no lies","That's who we're born to be"]},{"type":"verse","num":2,"repeat":false,"lines":["Waited so long to break these walls down","To wake up and feel like me","Put these patterns all in the past now","And finally live like the girl they all see"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["No more hiding, I'll be shining","Like I'm born to be","'Cause we are hunters, voices strong","And I know I believe"]},{"type":"chorus","num":null,"repeat":true,"lines":["We're goin' up, up, up","It's our moment","You know together we're glowing","Gonna be, gonna be golden","Oh, up, up, up","With our voices",{"text":"영원히 깨질 수 없는","sub":"ยองวอนฮี แคจิล ซู ออบนึน"},"Gonna be, gonna be golden"]},{"type":"bridge","num":null,"repeat":true,"lines":["Oh, I'm done hidin', now I'm shining","Like I'm born to be","Oh, our time, no fears, no lies","That's who we're born to be"]},{"type":"outro","num":null,"repeat":false,"lines":["You know we're gonna be, gonna be golden (Oh)","We're gonna be, gonna be (Oh)","Born to be, born to be glowin' (Oh)",{"text":"밝게 빛나는 우리","sub":"พัลเก บินนานึน อูรี"},"You know that it's our time, no fears, no lies (Oh, oh)","That's who we're born to be"]}]},
{"id":"drop-dead-olivia-rodrigo","titleEn":"Drop Dead","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I know that the bar closes at 11","But I hope you never finish that beer","You know all the words to \"Just Like Heaven\"","And I know why he wrote them now that you're standin' right here"]},{"type":"chorus","num":null,"repeat":false,"lines":["Oh, one night I was bored in bed","And stalked you on the internet","It's feminine intuition","'Cause I always had a vision of us standing like this","All pressed up in the bathroom line","You're lookin' like an angel on the walls of Versailles","The most alive I've ever been","But kiss me and I might drop dead"]},{"type":"verse","num":2,"repeat":false,"lines":["And I feel like I might throw up","Left hook, right punch to the gut","You're so, so pretty, boy","I'm paranoid I made you up","Yeah, I'd love it if you walked me home","If you promise, we can go real slow","'Cause I got chewing gum","And a bunch of stuff I'd like to know","Like, have you ever been to Japan","Or taken that Eurostar to France?","I've been droppin' hints all night","That I'd love if you held my hand, goddamn","And then maybe we could make-makeout","Clothes off and fall to the ground","Let's go steady, let's go out","And tell the whole damn world how"]},{"type":"chorus","num":null,"repeat":false,"lines":["One night, I was bored in bed","And stalked you on the internet","It's feminine intuition","'Cause I always had a vision of us standing like this","All pressed up in the bathroom line","You're lookin' like an angel on the walls of Versailles","The most alive I've ever been","But kiss me and I might"]},{"type":"bridge","num":null,"repeat":false,"lines":["Pisces and a Gemini","But I think we might go really nice together","If you let me stay the night","Well, I think I might just have to stay forever","Pisces and a Gemini","But I think we might go really nice together","If you let me stay the night","Well, I think I might just have to stay forever"]},{"type":"outro","num":null,"repeat":false,"lines":["(Oh) One night, I was bored in bed","And stalked you on the internet","It's feminine intuition","'Cause I always had a vision of us standing like this","All pressed up in the bathroom line","You're lookin' like an angel on the walls of Versailles","The most alive I've ever been","But kiss me and I might","Kiss me and I might","Kiss me and I might drop dead"]}]},
{"id":"stupid-song-olivia-rodrigo","titleEn":"Stupid Song","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["New York City's never looked so blue","My friends are smoking blunts in the bathroom","They say that honest love is a cage that makes you feel free","And all the girls at this party are so cool","That's never been a thing that I could do","But I can't help but imagine what you say when you speak with me"]},{"type":"chorus","num":null,"repeat":false,"lines":["You're a spark in the dark and my clothes all caught aflame","You should feel how I feel when somebody says your name","I'm a car speeding down the boulevard without a brake","And I want you more than any stupid song could ever say","I'm a heart made of wax and I'm melting in the sun","I'm a thread on your shirt that is coming undone","I feel right, I feel wrong, I feel totally insane","And I want you more than any stupid song could ever say"]},{"type":"verse","num":2,"repeat":false,"lines":["Walking through the park with my head high","Past all the college girls and the drunk guys","And if there is a god, he's the bond that's between us two","Seven nights alone and a skipped meal","I'm sleeping in my dress and my high heels","And I'm too shy to say what I see when I dream of you (When I dream of you)"]},{"type":"chorus","num":null,"repeat":true,"lines":["You're a spark in the dark and my clothes all caught aflame","You should feel how I feel when somebody says your name","I'm a car speeding down the boulevard without a brake","And I want you more than any stupid song could ever say","I'm a heart made of wax and I'm melting in the sun","I'm a thread on your shirt that is coming undone","I feel right, I feel wrong, I feel totally insane","And I want you more than any stupid song could ever say"]},{"type":"bridge","num":null,"repeat":false,"lines":["Every night like the one before","Dream of you from like 1 to 4","Positively and truly sure","Nobody's wanted somebody more","It's a thing that I can't ignore","Tell your friends that you're mine, I'm yours","With a hand on my heart, I swore","Nobody's wanted somebody more","It's a thing that I can't ignore","Tell your friends that you're mine, I'm yours","With a hand on my heart, I swore"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["I'm going crazy, I'm going mad","I want you, baby, so bad"]},{"type":"chorus","num":null,"repeat":true,"lines":["You're a spark in the dark and my clothes all caught aflame","You should feel how I feel when somebody says your name","I'm a car speeding down the boulevard without a brake","And I want you more than any stupid song could ever say","I'm a heart made of wax and I'm melting in the sun","I'm a thread on your shirt that is coming undone","I feel right, I feel wrong, I feel totally insane","And I want you more than any stupid song could ever say"]}]},
{"id":"the-cure-olivia-rodrigo","titleEn":"The Cure","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["All the pretty girls in the foreground of my mind","I thought I'd done enough, but they keep moving the line","I thought I found the antidote this time","I thought I found the antidote this time"]},{"type":"verse","num":2,"repeat":false,"lines":["And all the nights I spent fighting bad thoughts in my room","Feeling so alone, might as well be on the moon","I thought I found the antidote with you","I thought I found the antidote with you"]},{"type":"chorus","num":null,"repeat":false,"lines":["But my head is full of poison, and my heart is full of doubt","I got toxins in my bloodstream, you tried hard to suck 'em out","And it feels like medication, and it's good for me, I'm sure","But it don't matter how your love feels anymore","It'll never be the cure","It'll never be the cure"]},{"type":"verse","num":3,"repeat":false,"lines":["Used to play a game in my head when I'd date a guy","Tally up the girls that he fucked 'til I start to cry","I thought I found the antidote this time","I thought I found the antidote this time"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["But I'm unraveled (I'm unraveled)","I'm unraveled (I'm unraveled)","I'm unraveled (I'm unraveled)","I'm unraveled (I'm unraveled)"]},{"type":"chorus","num":null,"repeat":true,"lines":["And my head is full of poison, and my heart is full of doubt","I got toxins in my bloodstream, you tried hard to suck 'em out","And it feels like medication, and it's good for me, I'm sure","But it don't matter how your love feels anymore","It will never be the cure","It'll never be the cure, oh"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["'Cause, baby, I'm unraveled (I'm unraveled)","I'm unraveled (I'm unraveled)","I'm unraveled (I'm unraveled)","I'm unraveled (I'm unraveled, I'm unraveled)"]},{"type":"bridge","num":null,"repeat":false,"lines":["Why can't you come stitch me up? (I'm unraveled)","Why can't it ever be enough? (I'm unraveled)","Why can't you come stitch me up? (I'm unraveled)","Why can't it ever be enough? (I'm unraveled)","It's not enough"]},{"type":"outro","num":null,"repeat":false,"lines":["Oh, because my head is full of poison, and my heart is full of doubt (I'm unraveled)","I got toxins in my bloodstream you tried so hard to suck out (I'm unraveled)","And it feels like medication, and it's good for me, I'm sure (I'm unraveled)","But it don't matter how your love feels anymore (I'm unraveled)","It'll never be the cure","It will never be the cure","It'll never be"]}]},
{"id":"begged-olivia-rodrigo","titleEn":"Begged","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["All that I want is to know undoubtedly","That you just have eyes for me","Could you make it clear?","All that I want is to sit here silently","And watch movies on TV","What a shame you're not here","Here to witness my devotion","And my endless well of needs","I'm an anchor in the ocean","You know I could never leave"]},{"type":"chorus","num":null,"repeat":false,"lines":["So, I'm patient, you're learning, pretend it's not hurting, oh (Oh)","They say it's a virtue to not let good love slip away ('Way)","So, I'm cool and forgiving, I'll take what you're giving, oh woah (Oh)","But nothing's quite enough, when I know that to get it, I begged","Yeah, to get it, I begged"]},{"type":"verse","num":2,"repeat":false,"lines":["And I have this thought when I lay in bed at night","That I feel trapped inside my life","Is that a normal thing to fight back the waves","Of a static lover's dread?","I'm overwhelmed, I'm underfed","And yet I still cling","Cling to hope like snow on mountains (Cling to hope like)","Careless words melt it away (Careless, melt away)","I'm a penny in a fountain (In a fountain)","Just waiting on my luck to change"]},{"type":"chorus","num":null,"repeat":true,"lines":["So, I'm patient, you're learning, pretend it's not hurting, oh (Oh)","'Cause they say it's a virtue to not let good love slip away ('Way)","So, I'm cool and forgiving, I'll take what you're giving, oh (Ooh)","But nothing's quite enough, when I know that to get it, I begged","Yeah, to get it, I begged"]}]},
{"id":"cigarette-smoke-olivia-rodrigo","titleEn":"Cigarette Smoke","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["The cigarette smoke","Is a smell that I know","It clings to my clothes","And seeps into my bones","It's a real quiet house","With the shower left on","Five beers in the fridge and the second car's gone"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["I regret you","And how long I stayed","I resent you","For not being brave, oh"]},{"type":"chorus","num":null,"repeat":false,"lines":["Tell me something honest so the memories turn dark","You said that I made loving look easy","'Til I made it hard","Give me back my time and I will give you back your heart","I thought that we played the perfect couple","'Til you didn't want the part"]},{"type":"bridge","num":null,"repeat":false,"lines":["Some nights can be","So fucking lonely","But it's better than begging for you to stand up for me, honeybee"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["I regret you","And what I let slide","I resent you","For taking her side, oh"]},{"type":"chorus","num":null,"repeat":true,"lines":["Tell me something honest so the memories turn dark","You said that I made loving look easy","'Til I made it hard","Give me back my time and I will give you back your heart","I thought that we played the perfect couple","'Til you didn't want the part"]},{"type":"bridge","num":null,"repeat":false,"lines":["It's bone-dry, bitter and hollow","You'll be miles away tomorrow","Why'd I try at all?","It's bone-dry, bitter and hollow","You will never know my sorrow","Why'd I try at all?"]},{"type":"outro","num":null,"repeat":false,"lines":["Tell me something honest so the memories turn dark","Ooh, mm, the memories go dark","The memories go dark","The memories go dark","The memories go dark","Go dark","Go dark"]}]},
{"id":"less-olivia-rodrigo","titleEn":"Less","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I feel it again, edge of the bed","Body and head protesting","My stomach's in knots, I don't wanna talk","Let's just go to bed or something","Maybe it'll fix itself tomorrow","But I've been saying that like every night"]},{"type":"chorus","num":null,"repeat":false,"lines":["You say you can't stand to watch me cry a minute more","So you do the noble thing and open up the door","If loving me means letting go and wishing me the best","Then I guess","I wish, I wish, I wish you loved me less"]},{"type":"verse","num":2,"repeat":false,"lines":["We tried to recreate our favorite date","But we didn't laugh much this time","Our trip to Big Sur only confirmed","This isn't what it should feel like","And maybe I'm a stubborn overthinker","But I've been thinking over this a lot"]},{"type":"chorus","num":null,"repeat":false,"lines":["And I could try convincing you they're just intrusive thoughts","But you've seen me truly happy, so you know right now I'm not","If loving me means crying on the curb at LAX","Well, then I guess","I wish, I wish, I wish you loved me less"]},{"type":"outro","num":null,"repeat":false,"lines":["If loving me means saying, \"Babe, I think this is the end\"","I guess","I wish, I wish, I wish you loved me less"]}]},
{"id":"traitor-olivia-rodrigo","titleEn":"Traitor","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Brown guilty eyes and little white lies","Yeah, I played dumb but I always knew","That you talked to her, maybe did even worse","I kept quiet so I could keep you"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["And ain't it funny","How you ran to her","The second that we called it quits?","And ain't it funny","How you said you were friends?","Now it sure as hell don't look like it"]},{"type":"chorus","num":null,"repeat":false,"lines":["You betrayed me","And I know that you'll never feel sorry","For the way I hurt, yeah","You talked to her","When we were together","Loved you at your worst","But that didn't matter","It took you two weeks","To go off and date her","Guess you didn't cheat","But you're still a traitor"]},{"type":"verse","num":2,"repeat":false,"lines":["Now you bring her around","Just to shut me down","Show her off like she's a new trophy","And I know if you were true","There's no damn way that you","Could fall in love with somebody that quickly"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["Ain't it funny","All the twisted games","All the questions you used to avoid?","Ain't it funny?","Remember I brought her up","And you told me I was paranoid"]},{"type":"chorus","num":null,"repeat":true,"lines":["You betrayed me","And I know that you'll never feel sorry","For the way I hurt, yeah","You talked to her","When we were together","Loved you at your worst","But that didn't matter","It took you two weeks","To go off and date her","Guess you didn't cheat","But you're still a traitor"]},{"type":"bridge","num":null,"repeat":false,"lines":["God, I wish that you had thought this through","Before I went and fell in love with you","When she's sleeping in the bed we made","Don't you dare forget about the way"]},{"type":"chorus","num":null,"repeat":false,"lines":["You betrayed me","'Cause I know that you'll never feel sorry","For the way I hurt, yeah","You talked to her","When we were together","You gave me your word","But that didn't matter","It took you two weeks","To go off and date her","Guess you didn't cheat","But you're still"]},{"type":"outro","num":null,"repeat":false,"lines":["You're still a traitor","Yeah, you're still a traitor","God, I wish that you had thought this through","Before I went and fell in love with you"]}]},
{"id":"drivers-license-olivia-rodrigo","titleEn":"Drivers License","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I got my driver's license last week","Just like we always talked about","'Cause you were so excited for me","To finally drive up to your house","But today I drove through the suburbs","Crying 'cause you weren't around"]},{"type":"verse","num":2,"repeat":false,"lines":["And you're probably with that blonde girl","Who always made me doubt","She's so much older than me","She's everything I'm insecure about","Yeah, today I drove through the suburbs","'Cause how could I ever love someone else?"]},{"type":"chorus","num":null,"repeat":false,"lines":["And I know we weren't perfect but I've never felt this way for no one","And I just can't imagine how you could be so okay now that I'm gone","Guess you didn't mean what you wrote in that song about me","'Cause you said forever now I drive alone past your street"]},{"type":"verse","num":3,"repeat":false,"lines":["And all my friends are tired","Of hearing how much I miss you but","I kinda feel sorry for them","'Cause they'll never know you the way that I do","Yeah, today I drove through the suburbs","And pictured I was driving home to you"]},{"type":"chorus","num":null,"repeat":true,"lines":["And I know we weren't perfect but I've never felt this way for no one","Oh, and I just can't imagine how you could be so okay now that I'm gone","I guess you didn't mean what you wrote in that song about me","'Cause you said forever now I drive alone past your street"]},{"type":"bridge","num":null,"repeat":false,"lines":["Red lights","Stop signs","I still see your face","In the white cars","Front yards","Can't drive past the places","We used to","Go to","'Cause I still fucking love you, babe","Sidewalks","We crossed","I still hear your voice","In the traffic","We're laughing","Over all the noise","God, I'm so blue","Know we're through","But I still fucking love you, babe"]},{"type":"outro","num":null,"repeat":false,"lines":["I know we weren't perfect but I've never felt this way for no one","And I just can't imagine how you could be so okay now that I'm gone","Guess you didn't mean what you wrote in that song about me","'Cause you said forever now I drive alone past your street","Yeah, you said forever now I drive alone past your street"]}]},
{"id":"deja-vu-olivia-rodrigo","titleEn":"Deja Vu","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Car rides to Malibu","Strawberry ice cream, one spoon for two","And tradin' jackets","Laughin' 'bout how small it looks on you","(Ha-ha-ha-ha, ha-ha-ha-ha-ha, ha-ha-ha-ha)","Watching reruns of Glee","Bein' annoying, singin' in harmony","I bet she's braggin'","To all her friends, sayin' you're so unique, hmm"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["So when you gonna tell her that we did that, too?","She thinks it's special, but it's all reused","That was our place, I found it first","I made the jokes you tell to her when she's with you"]},{"type":"chorus","num":null,"repeat":false,"lines":["Do you get déjà vu when she's with you?","Do you get déjà vu? Ah, hmm","Do you get déjà vu, huh?"]},{"type":"verse","num":2,"repeat":false,"lines":["Do you call her, almost say my name?","'Cause let's be honest, we kinda do sound the same","Another actress","I hate to think that I was just your type","And I bet that she knows Billy Joel","'Cause you played her \"Uptown Girl\"","You're singin' it together","Now I bet you even tell her how you love her","In between the chorus and the verse (I love you)"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["So when you gonna tell her that we did that, too?","She thinks it's special, but it's all reused","That was the show we talked about","Played you the song she's singing now when she's with you"]},{"type":"chorus","num":null,"repeat":true,"lines":["Do you get déjà vu when she's with you?","Do you get déjà vu? (Oh-oh)","Do you get déjà vu?"]},{"type":"bridge","num":null,"repeat":false,"lines":["Strawberry ice cream in Malibu","Don't act like we didn't do that shit, too","You're tradin' jackets like we used to do","(Yeah, everything is all reused)","Play her piano, but she doesn't know","That I was the one who taught you Billy Joel","A different girl now, but there's nothing new"]},{"type":"outro","num":null,"repeat":false,"lines":["I know you get déjà vu","I know you get déjà vu","I know you get déjà vu"]}]},
{"id":"good-4-u-olivia-rodrigo","titleEn":"Good 4 U","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Well good for you, I guess you moved on really easily","You found a new girl and it only took a couple weeks","Remember when you said that you wanted to give me the world"]},{"type":"verse","num":2,"repeat":false,"lines":["And good for you, I guess that you've been working on yourself","I guess that therapist I found for you, she really helped","Now you can be a better man for your brand-new girl"]},{"type":"chorus","num":null,"repeat":false,"lines":["Well good for you","You look happy and healthy, not me","If you ever cared to ask","Good for you","You're doing great out there without me, baby","God, I wish that I could do that"]},{"type":"bridge","num":null,"repeat":false,"lines":["I've lost my mind","I've spent the night","Crying on the floor of my bathroom","But you're so unaffected, I really don't get it","But I guess good for you"]},{"type":"verse","num":3,"repeat":false,"lines":["Well good for you, I guess you're getting everything you want","You bought a new car and your career's really taking off","It's like we never even happened, baby","What the fuck is up with that?"]},{"type":"verse","num":4,"repeat":false,"lines":["And good for you, it's like you never even met me","Remember when you swore to God, I was the only","Person who ever got you","Well, screw that and screw you","You will never have to hurt the way you know that I do"]},{"type":"chorus","num":null,"repeat":true,"lines":["Well good for you","You look happy and healthy, not me","If you ever cared to ask","Good for you","You're doing great out there without me, baby","God, I wish that I could do that"]},{"type":"bridge","num":null,"repeat":true,"lines":["I've lost my mind","I've spent the night","Crying on the floor of my bathroom","But you're so unaffected, I really don't get it","But I guess good for you"]},{"type":"bridge","num":null,"repeat":false,"lines":["Maybe I'm too emotional","But your apathy's like a wound in salt","Maybe I'm too emotional","Or maybe you never cared at all","Maybe I'm too emotional","Your apathy's like a wound in salt","Maybe I'm too emotional","Or maybe you never cared at all"]},{"type":"chorus","num":null,"repeat":false,"lines":["Well good for you","You look happy and healthy, not me","If you ever cared to ask","Good for you","You're doing great out there without me, baby","Like a damn sociopath"]},{"type":"bridge","num":null,"repeat":true,"lines":["I've lost my mind","I've spent the night","Crying on the floor of my bathroom","But you're so unaffected, I really don't get it","But I guess good for you"]},{"type":"outro","num":null,"repeat":false,"lines":["Well good for you, I guess you moved on really easily"]}]},
{"id":"happier-olivia-rodrigo","titleEn":"Happier","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["We broke up a month ago","Your friends are mine","You know I know you've moved on","Found someone new","One more girl who brings out the better in you"]},{"type":"verse","num":2,"repeat":false,"lines":["And I thought my heart was detached","From all the sunlight of our past","But she's so sweet","She's so pretty","Does she mean you forgot about me?"]},{"type":"chorus","num":null,"repeat":false,"lines":["Oh, I hope you're happy","But not like how you were with me","I'm selfish, I know","I can't let you go","So find someone great but don't find no one better","I hope you're happy but don't be happier"]},{"type":"verse","num":3,"repeat":false,"lines":["And do you tell her she's the most beautiful girl you've ever seen?","An eternal love bullshit you know you'll never mean","Remember when I believed","You meant it when you said it first to me?"]},{"type":"verse","num":4,"repeat":false,"lines":["And now I'm picking her apart","Like cutting her down will make you miss my wretched heart","But she's beautiful","She looks kind","She probably gives you butterflies"]},{"type":"chorus","num":null,"repeat":true,"lines":["I hope you're happy","But not like how you were with me","I'm selfish, I know","I can't let you go","So find someone great but don't find no one better"]},{"type":"outro","num":null,"repeat":false,"lines":["I hope you're happy","I wish you all the best","Really","Say you love her, baby","Just not like you loved me","And think of me fondly when your hands are on her","I hope you're happy","But don't be happier"]},{"type":"chorus","num":null,"repeat":true,"lines":["I hope you're happy","Just not like how you were with me","I'm selfish, I know","Can't let you go","So find someone great but don't find no one better","I hope you're happy but don't be happier"]}]},
{"id":"jealousy-jealousy-olivia-rodrigo","titleEn":"Jealousy, Jealousy","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I kinda wanna throw my phone across the room","'Cause all I see are girls too good to be true","With paper-white teeth and perfect bodies","Wish I didn't care"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["I know their beauty's not my lack","But it feels like that weight is on my back","And I can't let it go"]},{"type":"chorus","num":null,"repeat":false,"lines":["Com-comparison is killin' me slowly","I think I think too much","'Bout kids who don't know me","I'm so sick of myself","I'd rather be, rather be","Anyone, anyone else","My jealousy, jealousy started followin' me (He-he-he, he)","Started followin' me (He-he-he, he)"]},{"type":"verse","num":2,"repeat":false,"lines":["And I see everyone gettin' all the things I want","I'm happy for them, but then again, I'm not","Just cool vintage clothes and vacation photos","I can't stand it","Oh God, I sound crazy"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["Their win is not my loss","I know it's true, but","I can't help gettin' caught up in it all"]},{"type":"chorus","num":null,"repeat":true,"lines":["Com-comparison is killin' me slowly","I think I think too much","'Bout kids who don't know me","I'm so sick of myself","Rather be, rather be","Anyone, anyone else","My jealousy, jealousy (Yeah)"]},{"type":"bridge","num":null,"repeat":false,"lines":["All your friends are so cool, you go out every night","In your daddy's nice car, yeah, you're livin' the life","Got a pretty face, a pretty boyfriend, too","I wanna be you so bad and I don't even know you","All I see is what I should be","Happier, prettier, jealousy, jealousy","All I see is what I should be","I'm losin' it, all I get's jealousy, jealousy"]},{"type":"outro","num":null,"repeat":false,"lines":["Com-comparison is killin' me slowly","I think I think too much","'Bout kids who don't know me","And I'm so sick of myself","Rather be, rather be (Oh, oh)","Anyone, anyone else (Anybody else)","Jealousy, jealousy","Oh, I'm so sick of myself","I'd rather be, rather be (Oh-oh-oh)","Anyone, anyone else","Jealousy, jealousy started followin' me"]}]},
{"id":"favorite-crime-olivia-rodrigo","titleEn":"Favorite Crime","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Know that I loved you so bad","I let you treat me like that","I was your willing accomplice, honey"]},{"type":"verse","num":2,"repeat":false,"lines":["And I watched as you fled the scene","Doe-eyed as you buried me","One heart broke, four hands bloody"]},{"type":"chorus","num":null,"repeat":false,"lines":["The things I did","Just so I could call you mine","The things you did","Well, I hope I was your favorite crime"]},{"type":"verse","num":3,"repeat":false,"lines":["You used me as an alibi","I crossed my heart as you crossed the line","And I defended you to all my friends"]},{"type":"verse","num":4,"repeat":false,"lines":["And now, every time a siren sounds","I wonder if you're around","'Cause you know that I'd do it all again"]},{"type":"chorus","num":null,"repeat":true,"lines":["Oh, the things I did","Just so I could call you mine","The things you did","Well, I hope I was your favorite crime"]},{"type":"bridge","num":null,"repeat":false,"lines":["It's bittersweet to think about the damage that we'd do","'Cause I was going down, but I was doing it with you","Yeah, everything we broke, and all the trouble that we made","But I say that I hate you with a smile on my face","Oh, look what we became"]},{"type":"chorus","num":null,"repeat":true,"lines":["Oh, the things I did","Just so I could call you mine","Oh, the things you did","Well, I hope I was your favorite crime"]},{"type":"outro","num":null,"repeat":false,"lines":["Your favorite crime","Your favorite crime","'Cause baby, you were mine"]}]},
{"id":"all-american-bitch-olivia-rodrigo","titleEn":"All-American Bitch","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["I am light as a feather, I'm as stiff as a board","I pay attention to things that most people ignore","And I'm alright with the movies","That make jokes 'bout senseless cruelty, that's for sure","And I am built like a mother and a total machine","I feel for your every little issue, I know just what you mean","And I make light of the darkness","I've got sun in my motherfuckin' pocket, best believe","Yeah, you know me, I"]},{"type":"chorus","num":null,"repeat":false,"lines":["Forgive, and I forget","I know my age, and I act like it","Got what you can't resist","I'm a perfect all-American"]},{"type":"verse","num":2,"repeat":false,"lines":["I am light as a feather, I'm as fresh as the air","Coca-Cola bottles that I only use to curl my hair","I got class and integrity","Just like a goddamn Kennedy, I swear","With love to spare, I"]},{"type":"chorus","num":null,"repeat":false,"lines":["Forgive, and I forget","I know my age, and I act like it","Got what you can't resist","I'm a perfect all-American bitch","With perfect all-American lips","And perfect all-American hips","I know my place","I know my place, and this is it"]},{"type":"bridge","num":null,"repeat":false,"lines":["I don't get angry when I'm pissed","I'm the eternal optimist","I scream inside to deal with it, like, \"Ah\"","Like, \"Ah\" (Oh my fucking God)"]},{"type":"outro","num":null,"repeat":false,"lines":["All the time","I'm grateful all the time","I'm sexy, and I'm kind","I'm pretty when I cry","Oh, all the time","I'm grateful all the time (Grateful all the fucking time)","I'm sexy, and I'm kind","I'm pretty when I cry"]}]},
{"id":"vampire-olivia-rodrigo","titleEn":"Vampire","titleTh":"","artistEn":"Olivia Rodrigo","artistTh":"โอลิเวีย โรดริโก","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Hate to give the satisfaction asking how you're doing now","How's the castle built off people you pretend to care about","Just what you wanted","Look at you, cool guy, you got it"]},{"type":"verse","num":2,"repeat":false,"lines":["I see the parties and the diamonds sometimes when I close my eyes","Six months of torture you sold as some forbidden paradise","I loved you truly","You gotta laugh at the stupidity"]},{"type":"chorus","num":null,"repeat":false,"lines":["'Cause I've made some real big mistakes","But you make the worst one look fine","I should've known it was strange","You only come out at night","I used to think I was smart","But you made me look so naïve","The way you sold me for parts","As you sunk your teeth into me, oh","Bloodsucker, famefucker","Bleeding me dry like a goddamn vampire"]},{"type":"verse","num":3,"repeat":false,"lines":["Every girl I ever talked to told me you were bad, bad news","You called them crazy God I hate the way I called them crazy too","You're so convincing","How do you lie without flinching? (How do you lie, how do you lie, how do you lie?)"]},{"type":"verse","num":4,"repeat":false,"lines":["Oh, what a mesmerizing, paralyzing, fucked up little thrill","Can't figure out just how you do it and God knows I never will","Went for me and not her","'Cause girls your age know better"]},{"type":"chorus","num":null,"repeat":true,"lines":["I've made some real big mistakes","But you make the worst one look fine","I should've known it was strange","You only come out at night","I used to think I was smart","But you made me look so naïve","The way you sold me for parts","As you sunk your teeth into me, oh","Bloodsucker, famefucker","Bleeding me dry like a goddamn vampire"]},{"type":"bridge","num":null,"repeat":false,"lines":["You said it was true love","But wouldn't that be hard?","You can't love anyone","'Cause that would mean you had a heart","I tried to help you out","Now I know that I can't","'Cause how you think's the kind of thing","I'll never understand"]},{"type":"chorus","num":null,"repeat":true,"lines":["I've made some real big mistakes","But you make the worst one look fine","I should've known it was strange","You only come out at night","I used to think I was smart","But you made me look so naïve","The way you sold me for parts","As you sunk your teeth into me, oh","Bloodsucker, famefucker","Bleeding me dry like a goddamn vampire"]}]},
{"id":"blank-space-taylor-swift","titleEn":"Blank Space","titleTh":"","artistEn":"Taylor Swift","artistTh":"เทย์เลอร์ สวิฟต์","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Nice to meet you, where you been?","I could show you incredible things","Magic, madness, heaven, sin","Saw you there, and I thought","\"Oh, my God, look at that face","You look like my next mistake","Love's a game, wanna play?\", ay"]},{"type":"verse","num":2,"repeat":false,"lines":["New money, suit and tie","I can read you like a magazine","Ain't it funny? Rumors fly","And I know you heard about me","So, hey, let's be friends","I'm dying to see how this one ends","Grab your passport and my hand","I can make the bad guys good for a weekend"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["So it's gonna be forever","Or it's gonna go down in flames","You can tell me when it's over, mm","If the high was worth the pain"]},{"type":"chorus","num":null,"repeat":false,"lines":["Got a long list of ex-lovers","They'll tell you I'm insane","'Cause you know I love the players","And you love the game","'Cause we're young, and we're reckless","We'll take this way too far","It'll leave you breathless, mm","Or with a nasty scar","Got a long list of ex-lovers","They'll tell you I'm insane","But I've got a blank space, baby","And I'll write your name"]},{"type":"verse","num":3,"repeat":false,"lines":["Cherry lips, crystal skies","I could show you incredible things","Stolen kisses, pretty lies","You're the king, baby, I'm your queen","Find out what you want","Be that girl for a month","Wait, the worst is yet to come, oh no"]},{"type":"verse","num":4,"repeat":false,"lines":["Screaming, crying, perfect storms","I can make all the tables turn","Rose garden filled with thorns","Keep you second guessing like","\"Oh, my God, who is she?\"","I get drunk on jealousy","But you'll come back each time you leave","'Cause, darling, I'm a nightmare dressed like a daydream"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["So it's gonna be forever","Or it's gonna go down in flames","You can tell me when it's over, mm","If the high was worth the pain"]},{"type":"chorus","num":null,"repeat":true,"lines":["Got a long list of ex-lovers","They'll tell you I'm insane","'Cause you know I love the players","And you love the game","'Cause we're young, and we're reckless (oh-ooh)","We'll take this way too far","It'll leave you breathless, mm (oh)","Or with a nasty scar","Got a long list of ex-lovers","They'll tell you I'm insane (insane)","But I've got a blank space, baby","And I'll write your name"]},{"type":"bridge","num":null,"repeat":false,"lines":["Boys only want love if it's torture","Don't say I didn't, say I didn't warn ya","Boys only want love if it's torture","Don't say I didn't, say I didn't warn ya"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["So it's gonna be forever","Or it's gonna go down in flames","You can tell me when it's over (over)","If the high was worth the pain"]},{"type":"chorus","num":null,"repeat":true,"lines":["Got a long list of ex-lovers","They'll tell you I'm insane","'Cause you know I love the players","And you love the game","'Cause we're young, and we're reckless (yeah)","We'll take this way too far (oh)","It'll leave you breathless, mm","Or with a nasty scar (leave a nasty scar)","Got a long list of ex-lovers","They'll tell you I'm insane","But I've got a blank space, baby","And I'll write your name"]}]},
{"id":"apt-rose-bruno-mars","titleEn":"APT.","titleTh":"","artistEn":"ROSÉ & Bruno Mars","artistTh":"โรเซ่ แอนด์ บรูโน มาร์ส","artistIcon":"🎤","sections":[{"type":"intro","num":null,"repeat":false,"lines":[{"text":"채영이가 좋아하는 랜덤 게임, 랜덤 게임","sub":"แชยองอีกา โจอาฮานึน แรนดอม เกอิม, แรนดอม เกอิม"},"Game start",{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"}]},{"type":"verse","num":1,"repeat":false,"lines":["Kissy face, kissy face sent to your phone, but","I'm tryna kiss your lips for real (uh-huh, uh-huh)","Red hearts, red hearts, that's what I'm on, yeah","Come give me somethin' I can feel, oh-oh-oh"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["Don't you want me like I want you, baby?","Don't you need me like I need you now?","Sleep tomorrow, but tonight go crazy","All you gotta do is just meet me at the"]},{"type":"chorus","num":null,"repeat":false,"lines":[{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"}]},{"type":"verse","num":2,"repeat":false,"lines":["It's whatever (whatever), it's whatever (whatever)","It's whatever (whatever) you like (whoo)",{"text":"Turn this 아파트 into a club (uh-huh, uh-huh)","sub":"อาพาทือ"},"I'm talking drink, dance, smoke, freak, party all night (come on)",{"text":"건배, 건배, girl, what's up? Oh-oh-oh","sub":"คอนแบ, คอนแบ"}]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["Don't you want me like I want you, baby?","Don't you need me like I need you now?","Sleep tomorrow, but tonight go crazy","All you gotta do is just meet me at the"]},{"type":"chorus","num":null,"repeat":true,"lines":[{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, uh-uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"}]},{"type":"bridge","num":null,"repeat":false,"lines":["Hey, so now you know the game","Are you ready? 'Cause I'm comin' to get ya, get ya, get ya","Hold on, hold on, I'm on my way","Yeah, yeah, yeah, yeah, yeah, I'm on my way","Hold on, hold on, I'm on my way","Yeah, yeah, yeah, yeah, yeah, I'm on my way"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["Don't you want me like I want you, baby?","Don't you need me like I need you now?","Sleep tomorrow, but tonight go crazy","All you gotta do is just meet me at the"]},{"type":"outro","num":null,"repeat":false,"lines":[{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트 (just meet me at the), uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트 (just meet me at the), uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트 (just meet me at the), uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, 아파트, 아파트","sub":"อาพาทือ, อาพาทือ, อาพาทือ, อาพาทือ"},{"text":"아파트, 아파트, uh, uh-huh, uh-huh","sub":"อาพาทือ, อาพาทือ"}]}]},
{"id":"ล่ำบึก-triumphs-kingdom","titleEn":"Lam Buek","titleTh":"ล่ำบึก","artistEn":"Triumphs Kingdom","artistTh":"ไทรอัมพ์ส คิงดอม","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["ล่ำบึ้กไปเท่านั้น ไม่เห็นเขาหล่อกว่าแฟนฉัน ไม่เห็นจะสักเท่าไร","ไหนใครบอกคิ้วหนาหน้าตาก็ดี รู้ไหมฉันแอบดูกี่ที ยังไงก็ยังไม่น่าสนใจ","ไว้จอนมีลักยิ้ม หน้าก็ดูติ๋มติ่ม","ม่ต้องเลยมายิ้ม ยังไงก็ยังไม่สนใคร","หน้าตาแบบบ้านบ้านหยุดเลยตรงนั้น","เพราะถ้าไม่หล่อกว่าแฟนฉัน ระวังให้ดีเถอะจะต้องเสียใจ"]},{"type":"chorus","num":null,"repeat":false,"lines":["ก็แฟนฉันรูปหล่อ (แฟนฉันรูปหล่อ)","และแฟนฉันรุ่นใหญ่ (แฟนฉันรุ่นใหญ่)","ไม่ทำเก็กไม่ทำตัวเด็กเด็ก","เรื่องเล็กไม่ทำเป็นเรื่องใหญ่","เหมือนหนุ่มหนุ่มทั่วไป","และแฟนฉันใจกว้าง (แฟนฉันใจกว้าง)","ไม่เคยจะห่างไปไหน","แม้ว่าเขาจะดูแก่","เหมือนว่าเขาเป็นเพื่อนแม่ แต่ฉันไม่เคยสนใจ","ก็แฟนฉันรูปหล่อ"]},{"type":"verse","num":2,"repeat":true,"lines":["ไว้จอนมีลักยิ้ม หน้าก็ดูติ๋มติ๋ม","ไม่ต้องเลยมายิ้ม ยังไงก็ไม่สนใคร","หน้าตาแบบบ้านบ้านหยุดเลยตรงนั้น","เพราะถ้าไม่หล่อกว่าแฟนฉัน ระวังให้ดีเถอะจะต้องเสียใจ"]},{"type":"chorus","num":null,"repeat":true,"lines":["ก็แฟนฉันรูปหล่อ (แฟนฉันรูปหล่อ)","และแฟนฉันรุ่นใหญ่ (แฟนฉันรุ่นใหญ่)","ไม่ทำเก็กไม่ทำตัวเด็กเด็ก","เรื่องเล็กไม่ทำเป็นเรื่องใหญ่","เหมือนหนุ่มหนุ่มทั่วไป","และแฟนฉันใจกว้าง (แฟนฉันใจกว้าง)","ไม่เคยจะห่างไปไหน","แม้ว่าเขาจะดูแก่","เหมือนว่าเขาเป็นเพื่อนแม่ แต่ฉันไม่เคยสนใจ","ก็แฟนฉันรูปหล่อ"]},{"type":"bridge","num":null,"repeat":false,"lines":["นี่เธอรู้ไหมว่าไม่ว่าเธอจะหล่อแค่ไหน","ก็แค่อยากบอกให้เธอรู้ไว้ จะได้ไม่ต้องทำหน้าสงสัย","ไม่ต้องยักคิ้วไม่ต้องวีดวิ้ว ไม่ต้องทำเก๊กเพราะดูแล้วอิ้ว","ฉันไม่เปลี่ยนใจไปจากเขาหรอกถ้ายังสงสัยก็คงต้องขอบอก"]},{"type":"chorus","num":null,"repeat":true,"lines":["ก็แฟนฉันรูปหล่อ (แฟนฉันรูปหล่อ)","และแฟนฉันรุ่นใหญ่ (แฟนฉันรุ่นใหญ่)","ไม่ทำเก็กไม่ทำตัวเด็กเด้ก","เรื่องเล็กไม่ทำเป็นเรื่องใหญ่","เหมือนหนุ่มหนุ่มทั่วไป","และแฟนฉันใจกว้าง (แฟนฉันใจกว้าง)","ไม่เคยจะห่างไปไหน","แม้ว่าเขาจะดูแก่","เหมือนว่าเขาเป็นเพื่อนแม่ แต่ฉันไม่เคยสนใจ","ก็แฟนฉันรูปหล่อ"]}]},
{"id":"ข้างกัน-threemandown","titleEn":"Khang Kan","titleTh":"ข้างกัน","artistEn":"Three Man Down feat. Om TELEx TELEXs","artistTh":"ทรี แมน ดาวน์ feat. ออม TELEx TELEXs","artistIcon":"🎸","sections":[{"type":"chorus","num":null,"repeat":false,"lines":["เธออยู่ตรงนั้นยืนอยู่ข้างฉัน","ฉันไม่เคยแม้แต่ฝันว่าจะได้พบเธอท่ามกลาง (ฮู้)","คนทั้งเมืองอีกเป็นล้าน","โดยไม่ต้องตามหาใคร","เมื่อเธอครอบครองฉัน"]},{"type":"verse","num":1,"repeat":false,"lines":["ฉันเคยเป็นอีกคน","ในเมืองแห่งความเหงาใจ","ที่ไม่เคยมีตัวตน","จนเธอเข้ามาครอบครองหัวใจ"]},{"type":"bridge","num":null,"repeat":false,"lines":["เหมือนว่าห้องของฉันกลับเปลี่ยนสีไป","มันสวยงามเกินกว่าจะพบได้ที่ใด","โอ เวลาดังหยุดเคลื่อนไหว","เมืองนี้ไม่เหงาอีกต่อไป","แค่วันนี้ฉันมีเธอ"]},{"type":"chorus","num":null,"repeat":true,"lines":["เธออยู่ตรงนั้น","ยืนอยู่ข้างฉัน","ฉันไม่เคยแม้แต่ฝันว่าจะได้พบเธอท่ามกลาง","คนทั้งเมืองอีกเป็นล้าน","โดยไม่ต้องตามหาใคร","เมื่อเธอครอบครองฉัน"]},{"type":"verse","num":2,"repeat":false,"lines":["หากว่ามีสิ่งใด","มาทำให้เราไม่เข้าใจ","อยากบอกเธอเอาไว้","หากฉันผิดไปฉันขอโทษ"]},{"type":"bridge","num":null,"repeat":true,"lines":["เหมือนว่าโลกของเราได้เปลี่ยนสีไป","มันสวยงามเกินกว่าจะพบได้ที่ใด","โอ เวลาดังหยุดเคลื่อนไหว","เมืองนี้ไม่เหงาอีกต่อไป","ต่อจากนี้ฉันมีเธอ"]},{"type":"chorus","num":null,"repeat":true,"lines":["เธออยู่ตรงนั้น","ยืนอยู่ข้างฉัน","ฉันไม่เคยแม้แต่ฝันว่าจะได้พบเธอท่ามกลาง","คนทั้งเมืองอีกเป็นล้าน","โดยไม่ต้องตามหาใคร","เมื่อเธอครอบครองฉัน"]},{"type":"bridge","num":null,"repeat":true,"lines":["เหมือนว่าโลกของเราได้เปลี่ยนสีไป","มันสวยงามเกินกว่าจะพบได้ที่ใด","โอ เวลาดังหยุดเคลื่อนไหว","เมืองนี้ไม่เหงาอีกต่อไป","ต่อจากนี้ฉันมีเธอ"]},{"type":"chorus","num":null,"repeat":true,"lines":["เธออยู่ตรงนั้น","ยืนอยู่ข้างฉัน","ฉันไม่เคยแม้แต่ฝันว่าจะได้พบเธอท่ามกลาง","คนทั้งเมืองอีกเป็นล้าน","โดยไม่ต้องตามหากัน"]},{"type":"outro","num":null,"repeat":false,"lines":["จะกอดเธอไว้ไม่ให้ไปไหน","เพราะวันนี้ไม่ใช่ฝัน","นับตั้งแต่เธอเข้ามา","หัวใจของฉันก็ไม่ต้องตามหาใคร","เมื่อเธอครอบครองฉัน"]}]},
{"id":"ทิ้งไป-onlymonday","titleEn":"Ting Pai","titleTh":"ทิ้งไป","artistEn":"Only Monday","artistTh":"ออนลี่ มันเดย์","artistIcon":"🎸","sections":[{"type":"intro","num":null,"repeat":false,"lines":["ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าฉันไม่ดีตรงไหน ทำไมเธอถึงเลือกเขา","ฝันที่วาดเอาไว้เรื่องของเรา เธอไม่เอา","ก็คงต้องโยนมันทิ้งไป"]},{"type":"verse","num":1,"repeat":false,"lines":["ชอบเธอมานานจนฉันเริ่มรู้ตัว","ว่ารักเธอไปแล้วทั้งใจ","แค่เพียงบอกออกไปไม่ได้ เลยสักครั้ง","ได้เพียงแต่คิดว่าเธอคงคิดเหมือนกัน","จนฉันนั้นก็ฝันไปมากมาย","แต่เธอกลับมาใจร้ายและไปกับเขา"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["เกือบจะดีแล้ว จนถึงวันที่เธอบอกว่าดีแล้ว","ที่เราเป็นแค่เพื่อนกัน","เธอไม่รู้ว่าไม่มีวันที่เรานั้นจะได้รักกันอยู่ดี"]},{"type":"chorus","num":null,"repeat":false,"lines":["ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าเขาคนนั้นเป็นใคร ทำไมมายืนแทนที่ฉัน","เธอทำให้ฝันฉันสลาย","เธอให้เขาเข้ามาทำลายคำว่าสองเรา","ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าฉันไม่ดีตรงไหน ทำไมเธอถึงเลือกเขา","ฝันที่วาดเอาไว้เรื่องของเรา เธอไม่เอา","ก็คงต้องโยนมันทิ้งไป"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["เกือบจะดีแล้ว จนถึงวันที่เธอบอกว่าดีแล้ว","ที่เราเป็นแค่เพื่อนกัน","เธอไม่รู้ว่าไม่มีวันที่เรานั้นจะได้รักกันอยู่ดี"]},{"type":"chorus","num":null,"repeat":true,"lines":["ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าเขาคนนั้นเป็นใคร ทำไมมายืนแทนที่ฉัน","เธอทำให้ฝันฉันสลาย","เธอให้เขาเข้ามาทำลายคำว่าสองเรา","ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าฉันไม่ดีตรงไหน ทำไมเธอถึงเลือกเขา","ฝันที่วาดเอาไว้เรื่องของเรา เธอไม่เอา","ก็คงต้องโยนมันทิ้งไป"]},{"type":"chorus","num":null,"repeat":true,"lines":["ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าเขาคนนั้นเป็นใคร ทำไมมายืนแทนที่ฉัน","เธอทำให้ฝันฉันสลาย","เธอให้เขาเข้ามาทำลายคำว่าสองเรา","ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าฉันไม่ดีตรงไหน ทำไมเธอถึงเลือกเขา","ฝันที่วาดเอาไว้เรื่องของเรา เธอไม่เอา เธอไม่เอา"]},{"type":"chorus","num":null,"repeat":true,"lines":["ไม่รู้ว่าทำไม ว่าฉันไม่เคยเข้าใจ","ว่าเขาคนนั้นเป็นใคร ทำไมมายืนแทนที่ฉัน","เธอทำให้ฝันฉันสลาย","เธอให้เขาเข้ามาทำลายคำว่าสองเรา","ไม่รู้ว่าทำไม และฉันไม่เคยเข้าใจ","ว่าฉันไม่ดีตรงไหน ทำไมเธอถึงเลือกเขา","ฝันที่วาดเอาไว้เรื่องของเรา เธอไม่เอา","ก็คงต้องโยนมันทิ้งไป"]},{"type":"outro","num":null,"repeat":false,"lines":["ก็คงต้องโยนมันทิ้งไป","ก็คงต้องโยนมันทิ้งไป"]}]},
{"id":"ฤดูร้อน-paradox","titleEn":"Ruedu Ron","titleTh":"ฤดูร้อน","artistEn":"Paradox","artistTh":"พาราด็อกซ์","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["บ่อยครั้งที่ใจเดินออกไปไม่มองข้างทาง","หยดน้ำตาอยู่กับการไม่มีค่า"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["ฉันเดินหลงทางอยู่กลางผู้คน ที่สับสนวุ่นวาย","หันไปหาเธอไม่เจอผู้ใด เมื่อเธอมาจากฉันไป"]},{"type":"chorus","num":null,"repeat":false,"lines":["ยืนมองท้องฟ้าไม่เป็นเช่นเคย","ฤดูร้อนไม่มีเธอเหมือนก่อนเหมือนเก่าขาดเธอ","ยืนมองท้องฟ้าไม่เป็นเช่นเคย","ฤดูร้อนไม่มีเธอเหมือนก่อนเหมือนเก่าขาดเธอ"]},{"type":"verse","num":2,"repeat":false,"lines":["หยุดทั้งหัวใจ เดินต่อไปไม่มีแสงดาว","โอบกอดน้ำตาโอบกอดหัวใจกับความเศร้า"]},{"type":"pre-chorus","num":null,"repeat":true,"lines":["ฉันเดินหลงทางอยู่กลางผู้คน ที่สับสนวุ่นวาย","หันไปหาเธอไม่เจอผู้ใด เมื่อเธอมาจากฉันไป"]},{"type":"chorus","num":null,"repeat":true,"lines":["ยืนมองท้องฟ้าไม่เป็นเช่นเคย","ฤดูร้อนไม่มีเธอเหมือนก่อนเหมือนเก่าขาดเธอ","ยืนมองท้องฟ้าไม่เป็นเช่นเคย","ฤดูร้อนไม่มีเธอเหมือนก่อนเหมือนเก่าขาดเธอ"]},{"type":"chorus","num":null,"repeat":false,"lines":["ยืนมองท้องฟ้า ฤดูร้อนไม่มีเธอเหมือนก่อนเหมือนเก่าขาดเธอ","ยืนมองท้องฟ้า ฤดูร้อนไม่มีเธอเหมือนก่อนเหมือนเก่าขาดเธอ"]},{"type":"outro","num":null,"repeat":false,"lines":["บ่อยครั้งที่ใจเปิดออกไปให้ลืมเรื่องราว","ฉากเก่าย้อนมาเปิดออกไปไม่เป็นเช่นเดิม"]}]},
{"id":"popular-wicked","titleEn":"Popular","titleTh":"","artistEn":"Wicked (Glinda) — orig. Kristin Chenoweth, film ver. Ariana Grande","artistTh":"วิคเค็ด (กลินดา) — ต้นฉบับ คริสติน เชนนาเวธ, ฉบับภาพยนตร์ อาริอานา กรานเด","artistIcon":"🎭","sections":[{"type":"intro","num":null,"repeat":false,"lines":["Elphie, now that we're friends, I've decided to make you my new project","You really don't have to do that","I know","That's what makes me so nice"]},{"type":"verse","num":1,"repeat":false,"lines":["Whenever I see someone less fortunate than I","And let's face it, who isn't less fortunate than I?","My tender heart tends to start to bleed","And when someone needs a makeover","I simply have to take over","I know, I know exactly what they need","And even in your case","Though it's the toughest case I've yet to face","Don't worry, I'm determined to succeed","Follow my lead","And yes, indeed","You will be"]},{"type":"chorus","num":null,"repeat":false,"lines":["Popular","You're gonna be popular","I'll teach you the proper ploys when you talk to boys","Little ways to flirt and flounce, ooh","I'll show you what shoes to wear, how to fix your hair","Everything that really counts to be","Popular","I'll help you be popular","You'll hang with the right cohorts, you'll be good at sports","Know the slang you've got to know","So let's start, 'cause you've got an awfully long way to go"]},{"type":"bridge","num":null,"repeat":false,"lines":["Don't be offended by my frank analysis","Think of it as personality dialysis","Now that I've chosen to become a pal, a sister and adviser","There's nobody wiser","Not when it comes to","Popular","I know about popular","And with an assist from me to be who you'll be","Instead of dreary who you were, well, are","There's nothing that can stop you from becoming populer, 'lar"]},{"type":"interlude","num":null,"repeat":false,"lines":["La-la, la-la","We're gonna make you popular","When I see depressing creatures","With unprepossessing features","I remind them on their own behalf to think of","Celebrated heads of state","Or 'specially great communicators"]},{"type":"verse","num":2,"repeat":false,"lines":["Did they have brains or knowledge?","Don't make me laugh","They were popular, please","It's all about popular","It's not about aptitude, it's the way you're viewed","So it's very shrewd to be","Very, very popular like me"]},{"type":"outro","num":null,"repeat":false,"lines":["Why, Miss Elphaba","Look at you","You're beautiful","I- I have to go","You're welcome","And though you protest","Your disinterest","I know clandestinely","You're gonna grin and bear it","Your new-found popularity (oh!)"]},{"type":"outro","num":null,"repeat":false,"lines":["La-la, la-la, you'll be popular","Just not quite as popular as me"]}]},
{"id":"the-girl-in-the-bubble-wicked","titleEn":"The Girl in the Bubble","titleTh":"","artistEn":"Wicked (Glinda)","artistTh":"วิคเค็ด (กลินดา)","artistIcon":"🎭","sections":[{"type":"intro","num":null,"repeat":false,"lines":["Look"]},{"type":"verse","num":1,"repeat":false,"lines":["There's that beautiful girl with a beautiful life","Such a beautiful life built on lies","'Cause all that's required to live in a dream","Is endlessly closing your eyes","She spins such beautiful stories to sing her to sleep","Full of magic and glory and love","She's the girl in the bubble","The bright, shiny bubble","Blissfully floating above"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["Ah, but the truth has a way of seeping on in","Beneath the surface and sheen","And blind as you to try to be, eventually","It's hard to unsee what you've seen"]},{"type":"verse","num":2,"repeat":false,"lines":["And so that beautiful girl with a beautiful life","Has a question that haunts her somehow","If she comes down from the sky","Gives the real world a try","Who in the world is she now?"]},{"type":"chorus","num":null,"repeat":false,"lines":["And though so much of her wishes that she could float on","And the beautiful lies never stop","For the girl in the bubble","The pink, shiny bubble","It's time for her bubble to pop"]},{"type":"outro","num":null,"repeat":false,"lines":["For the popular girl, high in the bubble","Isn't it high time for her bubble to pop?"]}]},
{"id":"no-good-deed-wicked","titleEn":"No Good Deed","titleTh":"","artistEn":"Wicked (Elphaba)","artistTh":"วิคเค็ด (เอลฟาบา)","artistIcon":"🎭","sections":[{"type":"intro","num":null,"repeat":false,"lines":["Eleka nahmen nahmen","Ah tum ah tum eleka nahmen","Eleka nahmen nahmen","Ah tum ah tum eleka nahmen"]},{"type":"verse","num":1,"repeat":false,"lines":["Let his flesh not be torn","Let his blood leave no stain","Though they beat him","Let him feel no pain","Let his bones never break","And however they try","To destroy him","Let him never die","Let him never die"]},{"type":"intro","num":null,"repeat":false,"lines":["Eleka nahmen nahmen","Ah tum ah tum eleka nahmen","Eleka nahmen nahmen","Ah tum ah tum eleka eleka"]},{"type":"verse","num":2,"repeat":false,"lines":["What good is this chanting?","I don't even know what I'm reading","I don't even know what trick I ought to try","Fiyero, where are you?","Already dead or bleeding?","One more disaster I can add to my","Generous supply"]},{"type":"chorus","num":null,"repeat":false,"lines":["No good deed goes unpunished","No act of charity goes unresented","No good deed goes unpunished","That's my new creed","My road of good intentions","Led where such roads always lead","No good deed goes unpunished"]},{"type":"bridge","num":null,"repeat":false,"lines":["Nessa","Doctor Dillamond","Fiyero","Fiyero"]},{"type":"verse","num":3,"repeat":false,"lines":["One question haunts and hurts","Too much, too much to mention","Was I really seeking good","Or just seeking attention?","Is that all good deeds are","When looked at with an ice-cold eye?","If that's all good deeds are","Maybe that's the reason why"]},{"type":"chorus","num":null,"repeat":true,"lines":["No good deed goes unpunished","All helpful urges should be circumvented","No good deed goes unpunished","Sure, I meant well","Well, look at what well-meant did"]},{"type":"outro","num":null,"repeat":false,"lines":["Alright, enough, so be it","So be it then","Let all Oz be agreed","I'm wicked through and through","And since I can't succeed","Fiyero, saving you","I promise no good deed","Will I attempt to do again","Ever again","No good deed","Will I do","Again"]}]},
{"id":"die-on-this-hill-sienna-spiro","titleEn":"Die on This Hill","titleTh":"","artistEn":"Sienna Spiro","artistTh":"เซียนน่า สไปโร","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Got me to stay, said that you need me","Starved 'cause his words don't have a meaning","No, they don't, at least not to me","There'll be a day I'll be more creative","A poetic way to say I'm not leaving","To the world, not to your face, mm"]},{"type":"chorus","num":null,"repeat":false,"lines":["I'll take my pride, stand here for you","No, I'm not blind, just seeing it through","You take my life just for the thrill","I'll take tonight, and die on this hill","I always will"]},{"type":"verse","num":2,"repeat":false,"lines":["I know that I look stubborn, impatient","But you wrote the book, I just took a page out","To be loved, to be loved and nothing more","And you kept your word, do you want a medal?","The way that someone leaves this world is all just levels","To me now, oh, to me now"]},{"type":"chorus","num":null,"repeat":true,"lines":["I'll take my pride, stand here for you","Know I'm not blind, just seeing it through","You take my life just for the thrill","I'll take tonight, and die on this hill","I always will"]},{"type":"bridge","num":null,"repeat":false,"lines":["I'll be here the whole night","I'll be here 'cause I can","Yeah, I know you don't care","I know nothing could matter","God, I wish something mattered to you"]},{"type":"chorus","num":null,"repeat":true,"lines":["I'll take my pride, stand here for you","Know I'm not blind, just seeing it through","You take my life just for the thrill","Well, I'll take tonight and die on this hill","I always, always","I always will"]}]},
{"id":"bad-romance-lady-gaga","titleEn":"Bad Romance","titleTh":"","artistEn":"Lady Gaga","artistTh":"เลดี้ กาก้า","artistIcon":"🎤","sections":[{"type":"intro","num":null,"repeat":false,"lines":["Ra-ra-ah-ah-ah","Roma-roma-ma","Gaga, ooh, la-la","Want your bad romance","Ra-ra-ah-ah-ah","Roma-roma-ma","Gaga, ooh, la-la","Want your bad romance"]},{"type":"verse","num":1,"repeat":false,"lines":["I want your ugly, I want your disease","I want your everything as long as it's free","I want your love","Love, love, love, I want your love (hey!)","I want your drama, the touch of your hand (hey!)","I want your leather-studded kiss in the sand","I want your love","Love, love, love, I want your love (love, love, love, I want your love)"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["You know that I want you","And you know that I need you","I want it bad","Bad romance"]},{"type":"chorus","num":null,"repeat":false,"lines":["I want your loving and I want your revenge","You and me could write a bad romance (oh-oh-oh-oh-oh-oh)","I want your loving, all your love is revenge","You and me could write a bad romance (oh-oh-oh-oh-oh-oh-oh-oh-oh-oh)","Caught in a bad romance (oh-oh-oh-oh-oh-oh-oh-oh-oh-oh)","Caught in a bad romance"]},{"type":"interlude","num":null,"repeat":true,"lines":["Ra-ra-ah-ah-ah","Roma-roma-ma","Gaga, ooh, la-la","Want your bad romance"]},{"type":"verse","num":2,"repeat":false,"lines":["I want your horror, I want your design","'Cause you're a criminal as long as you're mine","I want your love","Love, love, love, I want your love","I want your psycho, your vertigo schtick","Want you in my rear window, baby, it's sick","I want your love","Love, love, love, I want your love (love, love, love, I want your love)"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["You know that I want you","And you know that I need you ('cause I'm a free bitch, baby)","I want it bad","Your bad romance"]},{"type":"chorus","num":null,"repeat":true,"lines":["I want your loving and I want your revenge","You and me could write a bad romance","I want your loving, all your love is revenge","You and me could write a bad romance (oh-oh-oh-oh-oh-oh-oh-oh-oh-oh)","Caught in a bad romance (oh-oh-oh-oh-oh-oh-oh-oh-oh-oh)","Caught in a bad romance"]},{"type":"interlude","num":null,"repeat":true,"lines":["Ra-ra-ah-ah-ah","Roma-roma-ma","Gaga, ooh, la-la","Want your bad romance"]},{"type":"bridge","num":1,"repeat":false,"lines":["Walk, walk, fashion, baby","Work it, move that bitch crazy","Walk, walk, fashion, baby","Work it, move that bitch crazy","Walk, walk, passion, baby","Work it, I'm a free bitch, baby"]},{"type":"bridge","num":2,"repeat":false,"lines":["I want your love and I want your revenge","I want your love, I don't wanna be friends","J'veux ton amour et je veux ta revanche","J'veux ton amour, I don't wanna be friends (oh-oh-oh-oh-oh-oh)","I don't wanna be friends (oh-oh-oh-oh-oh-oh)","Caught in a bad romance","I don't wanna be friends (oh-oh-oh-oh-oh-oh)","Want your bad romance","Caught in a bad romance","Want your bad romance"]},{"type":"chorus","num":null,"repeat":true,"lines":["I want your loving and I want your revenge","You and me could write a bad romance","I want your loving, all your love is revenge","You and me could write a bad romance (oh-oh-oh-oh-oh-oh)","Want your bad romance","Caught in a bad romance","Want your bad romance (oh-oh-oh-oh-oh-oh)","Want your bad romance","Caught in a bad romance"]},{"type":"outro","num":null,"repeat":true,"lines":["Ra-ra-ah-ah-ah","Roma-roma-ma","Gaga, ooh, la-la","Want your bad romance"]}]},
{"id":"pick-up-your-feeling-rami","titleEn":"Pick Up Your Feeling","titleTh":"","artistEn":"RAMI (BABYMONSTER)","artistTh":"รามี่ (เบบี้มอนสเตอร์)","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["You said that I've been actin' different, yeah","Funny how I finally flipped the script on you","When you the one who's double-dippin', yeah","You so sloppy, how I caught you slippin' up","You're off the lease","Run me my keys","No more poppin' up to hit it, yeah","I ain't even got the miles to trip on you"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["New phone, who is this?","Brand new like the whip","Rack it up, no assist","Main one, I ain't average","Wake up, need a trip","Energy, feel a hit","Look at my jeans, I'm too thick","I ain't got the room for extra baggage"]},{"type":"chorus","num":null,"repeat":false,"lines":["Don't forget to come and pick up your, ooh, feelings","Don't leave no piece","You need to hurry and pick up your, ooh-ooh, feelings","While I'm up cleaning"]},{"type":"post-chorus","num":null,"repeat":false,"lines":["Boy, please, I don't need it","Memories, all that is, you can keep it, oh, oh","Don't forget to come and pick up your, ooh-ooh, feelings","Don't leave no pieces"]},{"type":"bridge","num":null,"repeat":false,"lines":["The time I spent in the past, yeah",{"text":"이제는 보내줄게 다","sub":"อีเจนึน โพแนจุลเก ดา"},{"text":"나는 미련 없으닉가 후회하지도 않아","sub":"นานึน มิรยอน ออบซือนิกกา ฮูฮเวฮาจีโด อันอา"},"You're looking forward to me right? Right?","Now I take the weight off me"]},{"type":"interlude","num":null,"repeat":false,"lines":["Woo-ooh-ooh-ooh-ooh-ooh-ooh-ooh, ooh","Woo-ooh, woo-ooh, woo-ooh-ooh-ooh-ooh"]},{"type":"outro","num":null,"repeat":false,"lines":["You need to hurry and pick up your, ooh, feelings","Don't leave no pieces, yeah, mm-mm, mm-mm, mm-mm"]}]},
{"id":"แอวลั่นปั๊ด-primlinethai","titleEn":"Aew Lan Pat","titleTh":"แอวลั่นปั๊ด","artistEn":"Prim Linethai","artistTh":"ปริม ลายไทย","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["ได้ยินเสียงดังตึบ ๆ","เเอวกะคึก อยากบันเลง","อาการเป็นจั่งอยากเด่ง","เส้นเเอวเข่ง อีกเเล้วเรา"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["กะบ่เข้าใจ คือกัน","จั๊กว่าเเอว ข่อยเป็นหยัง","หรือวาเป็นนำ เส้นจั่ง","ย้อนควายตำ เเต่ปีก่อน.."]},{"type":"chorus","num":null,"repeat":false,"lines":["เเอวลั้นปั๊ด ลั้นปั๊ด ลั้นปั๊ด (ลั่นปุ๊ดก็ได้)","เเอวลั้นปั๊ด ลั้นปั๊ด ลั้นปั๊ด","เเอวมันลั้น เสียงดัง.. ดัง ปั๊ด ๆ ๆ ๆ ๆ","เเอวลั้นปั๊ด ลั้นปั๊ด ลั้นปั๊ด","เเอวลั้นปั๊ด ลั้นปั๊ด ลั้นปั๊ด","เสียงเเอวมันลั้น เสียงดัง...ดัง ปั๊ด ๆ ๆ ๆ ๆ","มันบ่เจ็บ บ่ปวด","เเต่ข่อยคอบคุม บ่ได้","เสียงเพลง ผ่านหูยามได","ต้องเด่งไส่ จนดังปั๊ด ๆ ๆ ๆ ๆ ๆ ๆ"]},{"type":"verse","num":2,"repeat":false,"lines":["อยากสิไป หาหมอ","มีบ่น้อ ยาเเก้เส้นเด้า","เผื่ออาการ จะทุเลา","เผื่อมันเซา เด้า(ลั่น)ตามเสียงเพลง","โอ โอ้ โอ โอ้โอ โอ้โอ โอ้โอ โอ้"]},{"type":"instrumental","num":null,"repeat":false,"lines":["(Solo)"]},{"type":"bridge","num":null,"repeat":false,"lines":["มันบ่เจ็บ บ่ปวด","เเต่ข่อยคอบคุม บ่ได้","เสียงเพลง ผ่านหูยามได","ต้องเด่งไส่ จนดังปั๊ด ๆ ๆ ๆ ๆ ๆ ๆ","ได้ยินเพลงจังหวะโดนใจ","ต้องเด้าไส่.. จนลั่นปั๊ด ๆ ๆ ๆ ๆ"]},{"type":"outro","num":null,"repeat":false,"lines":["จุ ๆ ๆ ๆ ๆ ว้ายแอวเข๊ดด.."]}]},
{"id":"เจ็บตรงนี้-ลำไย-ไหทองคำ","titleEn":"Jep Trong Ni (Kod Hai Nong Nae)","titleTh":"เจ็บตรงนี้ (กดให้น้องแหน่)","artistEn":"Lamyai Haithongkham","artistTh":"ลำไย ไหทองคำ","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["ปวดหัวกินยาเดี๋ยวก็หาย","ปวดตามร่างกายนวดได้ไม่เป็นไร","ปวดแขนปวดขายังมียาสมุนไพร","นวดให้สบายทุกคนผ่อนคลายหายเมื่อย","แต่ มันปวดที่ใจ จะทำยังไงกับใจที่บอกช้ำ","เจ็บปวดจากคนใจดำ","อยากให้อ้ายมานวดมาคลำให้น้องแหน่"]},{"type":"chorus","num":null,"repeat":false,"lines":["เจ็บตรงนี้ โอ๊ย ปวดตรงนี้","โอ๊ย เจ็บตรงนี้ส่อยนวดให้แหน่","เจ็บตรงนี้เจ็บที่ใจ","อยากให้อ้ายส่อยกดให้แหน่","เจ็บตรงนี้ โอ๊ยเจ็บอิหลี","อยากให้อ้ายส่อยเป็นคนแก้","ยับออกมานวดให้แหน่ โอ๊ย","เจ็บตรงนี้ โอ๊ย ปวดตรงนี้","โอ๊ยเจ็บตรงนี้ส่อยนวดให้แหน่","เจ็บตรงนี้เจ็บที่ใจ","อยากให้อ้ายส่อยกดให้แหน่","เจ็บตรงนี้ โอ๊ยเจ็บอิหลี","อยากให้อ้ายส่อยเป็นคนแก้","ยับออกมานวดให้แหน่"]},{"type":"outro","num":1,"repeat":false,"lines":["โอ๊ย กดจุดให้น้องแหน่"]},{"type":"bridge","num":null,"repeat":false,"lines":["อ้ายเอ้ย เจ็บหม่องใด๋สมุนไพรเอาอยู่","เจ็บที่ใจเฮ็ดจั่งใด๋บ่ฮู้ นออ้ายจ๋า","อ้ายเอ้ยเจ็บอิหลีอยากให้อ้ายคลำเบิ่ง","เจ็บเทิ่ง ๆ เทิ่งเจ็บเทิ่งใต้ ต้องเฮ็ดแนวใด๋","อุ๊ย กดให้น้องแหน่อ้าย โอ้ย อุ๊ย อุ๊ย โอ๊ย"]},{"type":"verse","num":1,"repeat":true,"lines":["ปวดหัวกินยาเดี๋ยวก็หาย","ปวดตามร่างกายนวดได้ไม่เป็นไร","ปวดแขนปวดขายังมียาสมุนไพร","นวดให้สบายทุกคนผ่อนคลายหายเมื่อย","แต่ มันปวดที่ใจ จะทำยังไงกับใจที่บอกช้ำ","เจ็บปวดจากคนใจดำ","อยากให้อ้ายมานวดมาคลำให้น้องแหน่"]},{"type":"chorus","num":null,"repeat":true,"lines":["เจ็บตรงนี้ โอ๊ย ปวดตรงนี้","โอ๊ย เจ็บตรงนี้ส่อยนวดให้แหน่","เจ็บตรงนี้เจ็บที่ใจ","อยากให้อ้ายส่อยกดให้แหน่","เจ็บตรงนี้ โอ๊ยเจ็บอิหลี","อยากให้อ้ายส่อยเป็นคนแก้","ยับออกมานวดให้แหน่ โอ๊ย","เจ็บตรงนี้ โอ๊ย ปวดตรงนี้","โอ๊ยเจ็บตรงนี้ส่อยนวดให้แหน่","เจ็บตรงนี้เจ็บที่ใจ","อยากให้อ้ายส่อยกดให้แหน่","เจ็บตรงนี้ โอ๊ยเจ็บอิหลี","อยากให้อ้ายส่อยเป็นคนแก้","ยับออกมานวดให้แหน่"]},{"type":"outro","num":2,"repeat":true,"lines":["โอ๊ย กดจุดให้น้องแหน่"]}]},
{"id":"สี่กษัตริย์เดินดง-traditional","titleEn":"Si Kasat Doen Dong","titleTh":"สี่กษัตริย์เดินดง","artistEn":"Traditional Thai sermon chant (แหล่)","artistTh":"แหล่พื้นบ้าน (ประกอบเทศน์มหาชาติ)","artistIcon":"📿","sections":[{"type":"verse","num":1,"repeat":false,"lines":["จะกล่าวถึงองค์สี่ กษัตริย์ตรา ออกจากพารา เข้าเดินดง เออ...","พระเวสสันดร สุริยวงค์ ท้าวเธออุ้มองค์ พ่อชาลี","โฉมนางมัทรี แม่กัลยา อุ้มแก้วกัญหา กุมารี","เอ้าตามเสด็จ เออ... พระสามี เดินจรลีมาในไพร"]},{"type":"verse","num":2,"repeat":false,"lines":["ทิพากร ก็อ่อนอับ ว่าเย็นเย็นเย็น ตะระเย็นเย็นเย็นระยับ ลงไรไร","ชะนีน้อยน้อย นะมันก็ห้อยกิ่งไม้ ร้องร่ำพิไรอยู่บนยอดยาง","บ้างหวลพระทัยเอ้าให้ระคาง คิดถึงสุรางค์ ที่เคยเรียงกร"]},{"type":"verse","num":3,"repeat":false,"lines":["เอ๋ยแจ้วแจ้ว แว่วเสียง เสนาะสำเนียง ชะนีวอน","เรียกผัวโว้ยโว้ย สำออยอ้อน เที่ยวเร่ร่อน เออว่ารำพิไร","ร้องเรียกผัวโว้ย ว่าผัวโว้ย ทำไมไม่โหย ให้เมียชื่นใจ"]},{"type":"verse","num":4,"repeat":false,"lines":["ว่าเหล่าลิงค่าง เออ... เอ้าบ้างลิงลม","บ้างก็ลอยกลิ้งกลม ตามลมพระพาย","มาจับตะโก เออ ตะเกียกตะกาย แล้วเหาะหายระเห็ดลอย","เหมือนเราทั้งสี่ เออ... มาเดินไพร"]},{"type":"verse","num":5,"repeat":false,"lines":["ไม่เห็นจะมีใครละก็จะมาติดตามต้อย","เป็นเวรมาซ้ำเออนะเป็นกรรมมาพลอย","ซัดให้เลื่อนลอยจากพารา"]},{"type":"verse","num":6,"repeat":false,"lines":["มัทรีเอ๋ย นกสาริกา ส่งเสียงจ้า ช่างน่าฟัง","สาริกาที่นอกวัง มันส่งเสียงดัง วังเวงไพร","ทิพากรก็อ่อนอับ ว่าเย็นเย็นเย็นตะระเย็นเย็นเย็นระยับ ลง ไรไร","สี่กษัตรา ก็คลาไคล เข้าสู่พงไพรพนาดร"]}]},
{"id":"ไหงง่อง-takkatanchollada","titleEn":"Ngai Ngong","titleTh":"ไหงง่อง","artistEn":"Takkatan Chollada","artistTh":"ตั๊กแตน ชลดา","artistIcon":"🎤","sections":[{"type":"verse","num":1,"repeat":false,"lines":["ละพอแต่เปิดผะม่านกั้ง","ผะม่านกั้ง","สาวหมอลำสิพาม่วน","คนหนุ่มคนสาวขอเชิญชวน","ออกมาม่วนหน้าเวที","โยนทิ้งความทุกข์ความโศก","ออกมาย่อมาโยก","เอาความโศกทิ้งไป","ไผบ่ฮักกะส่างหัวอย่าใส่ใจ","แฟนคนเดียวบ่ตายหาเอาใหม่","แต่ความสุขทางใจ","คือเด้งใส่หมอลำ"]},{"type":"verse","num":2,"repeat":false,"lines":["งานบุญยุไสขอแต่ได้ยินเสียง","ฝนสิตกฟ้าผ่าเปรี้ยง","เปรี้ยงเปรี้ยงเปรี้ยงเปรี้ยง","บ่เคยเกี่ยงจักเถื่อ","แก๊งสาวโสดเรื่องหมอลำบ่เคยเบื่อ","หมอลำยุไสผู้เฒ่าสั่นสาดสั่นเสื่อ","ย้อนเพิ่นเปิดเพิ่นเบื่อ","ย้อนขี้ฝุ่นไหง่ง่อง"]},{"type":"pre-chorus","num":null,"repeat":false,"lines":["อ้าวไหง่ไหง่ไหง่ไหง่ง่อง"]},{"type":"chorus","num":null,"repeat":false,"lines":["เพื่อนหญิงพร้อมบ่ค่า","เพื่อนเทยพร้อมบ่ค่า","คนโสดขยับมา","สิพาหย่าว","หย่าวหย่าวหย่าว","สาวหมอลำเจ้าหย่าวหย่าวหย่าว","ชีวิตของเฮา","อย่าเศร้าอย่าซึม","ตรึมตรึมตรึม","หน้าเวทีแน่นตรึมตรึมตรึม","ม่วนให้มันลืม","ลืมคนที่ทิ้งเราไป","เต้นกันไหง่ง่อง","บ่สนหัวปอดผู้ใด๋","เต้นหน้าเวที","กะบ่สร้างความวุ่นวาย","ผู้สาวยุคใหม่","หัวใจมักม่วน"]},{"type":"chorus","num":null,"repeat":true,"lines":["เพื่อนหญิงพร้อมบ่ค่า","เพื่อนเทยพร้อมบ่ค่า","คนโสดขยับมา","สิพาหย่าว","หย่าวหย่าวหย่าว","สาวหมอลำเจ้าหย่าวหย่าวหย่าว","ชีวิตของเฮา","อย่าเศร้าอย่าซึม","ตรึมตรึมตรึม","หน้าเวทีแน่นตรึมตรึมตรึม","ม่วนให้มันลืม","ลืมคนที่ทิ้งเราไป","เต้นกันไหง่ง่อง","บ่สนหัวปอดผู้ใด๋","เต้นหน้าเวที","กะบ่สร้างความวุ่นวาย","ผู้สาวยุคใหม่","หัวใจมักม่วน"]}]}
];

/* ===================== STATE ===================== */
const songState = {
  view: 'home',          // home | detail
  currentId: null,
  mode: 'clean',          // clean | view | edit
  searchQuery: '',
  sortMode: 'title',      // title | artist
  activeSetlistId: null,  // null = browse all songs
  setlistManageMode: false,
  strokes: [], notes: [], stickers: [],
  snapshot: null,
  currentTool: 'pencil',
  currentColor: '#e85d8a',
  brushSize: 's', // always starts at 1px (SONG_BRUSH_SIZES.s) — not persisted
  eraserMode: 'stroke',   // stroke | pixel
  eraserSize: 'm',
  noteBorder: true,
  noteFontSize: 'm',
  noteColor: '#000000',
  selectedSticker: null,
};

const SONG_STORAGE_PREFIX = 'walnut_song_note_';
const SONG_SETLIST_KEY = 'walnut_song_setlists';
const SONG_COLORS = ['#e85d8a', '#4d96ff', '#6bcB77', '#ffd93d', '#9b5de5', '#3a3a3a'];
const SONG_NOTE_COLORS = ['#000000', '#ffffff', '#e85d8a', '#4d96ff', '#6bcB77', '#ffd93d', '#9b5de5'];
const SONG_STICKERS = ['🎵','🎶','🎤','🎧','🎸','🎹','🥁','🎷','🎺','🎻','🔔','📯','💖','💗','💓','💕','💞','💘','❤️','🧡','💛','💚','💙','💜','🤍','✨','🌟','⭐','💫','🌠','💎','😊','🥳','🎉','🌈','🦋'];
const SONG_BRUSH_SIZES = { xs: 0.5, s: 1, m: 2, l: 4 };
const SONG_ERASER_SIZES_STROKE = { s: 0.02, m: 0.035, l: 0.055 }; // "erase whole line" hit-test radius
const SONG_ERASER_SIZES_PIXEL  = { s: 0.005, m: 0.01, l: 0.017 }; // "erase like a pencil eraser" — finer, ~3/6/10px radius on a ~600px-wide page
const SONG_NOTE_FONT_SIZES = { s: 11, m: 14, l: 18 };
const SONG_STICKER_MIN = 16, SONG_STICKER_MAX = 80, SONG_STICKER_DEFAULT = 34;
const SONG_TYPE_LABEL = {
  'verse': '▸ Verse', 'chorus': '★ Chorus', 'bridge': '◆ Bridge', 'pre-chorus': '◇ Pre-Chorus',
  'instrumental': '♪ Instrumental', 'intro': '♪ Intro', 'outro': '♪ Outro', 'interlude': '♪ Interlude',
  'rap': '🎤 Rap'
};
const SONG_ALPHABET = ['0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
const SONG_SCROLL_SPEED_KEY = 'walnut_song_scroll_speed';
const SONG_SCROLL_SPEEDS = [4, 8, 12, 15, 20, 25, 30, 40, 60, 80]; // px/sec, index = level-1
let songScrollSpeed = parseInt(localStorage.getItem(SONG_SCROLL_SPEED_KEY) || '5', 10);
let songScrollRAF = null;
let songScrollLastTime = null;
let songScrollAccPos = null;

/* ===================== STYLE (inject once) ===================== */
function ensureSongsStyle(){
  if(document.getElementById('songs-style-tag')) return;
  const style = document.createElement('style');
  style.id = 'songs-style-tag';
  style.textContent = `
    #songs-root{ font-family:'Nunito','Sarabun',sans-serif; }
    .songs-home-header{ text-align:center; padding:14px 8px 10px; background:linear-gradient(150deg,#daeeff 0%,#eef7ff 45%,#fce8f4 100%); border-radius:16px; margin-bottom:12px; }
    .songs-home-header h2{ font-size:20px; font-weight:900; background:linear-gradient(135deg,#4a9fd4,#7ec0ee,#d47ab0); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0; }
    .songs-home-header .sub{ font-size:12px; color:#7aaac8; font-weight:700; margin-top:2px; }
    #songs-search{ width:100%; padding:10px 14px; border-radius:12px; border:1px solid #cfe6f5; font-size:14px; margin-bottom:8px; }
    .songs-seg{ display:flex; background:#fff; border-radius:10px; padding:3px; margin-bottom:10px; box-shadow:0 2px 6px rgba(0,0,0,.05); }
    .songs-seg button{ flex:1; border:none; background:transparent; padding:7px 4px; border-radius:8px; font-size:12px; color:#888; cursor:pointer; }
    .songs-seg button.active{ background:#7ec0ee; color:#fff; font-weight:700; }
    .songs-az{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:10px; }
    .songs-az button{ border:none; background:#fff; color:#4a9fd4; font-size:11px; font-weight:700; width:24px; height:24px; border-radius:6px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,.06); }
    .songs-az button.disabled{ opacity:.3; pointer-events:none; }
    .songs-section-hd{ font-size:11px; font-weight:800; color:#d47ab0; margin:12px 2px 5px; letter-spacing:.06em; }
    .songs-item{ background:#fff; border-radius:12px; padding:10px 12px; margin-bottom:6px; box-shadow:0 2px 6px rgba(0,0,0,.06); cursor:pointer; }
    .songs-item .t{ font-size:12px; font-weight:500; color:#8ba0b3; }
    .songs-item .t .th{ font-weight:700; color:#345f80; font-size:15px; }
    .songs-item .a{ font-size:11px; color:#9bb; margin-top:1px; }
    .songs-item .badge{ margin-left:4px; }
    .songs-empty{ text-align:center; color:#c99; font-size:13px; margin-top:24px; }

    .songs-artist-group{ margin-bottom:12px; border-radius:12px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,.06); }
    .songs-artist-header{ display:flex; align-items:center; gap:6px; font-size:13px; font-weight:800; color:#fff; background:#4a9fd4; padding:7px 12px; }
    .songs-artist-header .th{ font-weight:600; color:#eaf5ff; }
    .songs-artist-group .songs-item{ border-radius:0; margin-bottom:0; box-shadow:none; border-left:3px solid #4a9fd4; border-bottom:1px solid #eef4fa; }
    .songs-artist-group .songs-item:last-child{ border-bottom:none; }

    .songs-setlist-row{ display:flex; gap:6px; overflow-x:auto; padding-bottom:4px; margin-bottom:10px; }
    .songs-setlist-chip{ flex-shrink:0; border:none; background:#fff; color:#7aaac8; font-size:12px; font-weight:700; padding:7px 13px; border-radius:999px; box-shadow:0 2px 6px rgba(0,0,0,.06); cursor:pointer; white-space:nowrap; }
    .songs-setlist-chip.active{ background:#7ec0ee; color:#fff; }
    .songs-setlist-chip.new{ background:#fff0f8; color:#d47ab0; }
    .songs-setlist-bar{ display:flex; align-items:center; gap:8px; margin-bottom:10px; }
    .songs-setlist-bar .name{ font-size:15px; font-weight:800; color:#345f80; flex:1; }
    .songs-setlist-bar button{ border:none; background:#fff; padding:6px 11px; border-radius:9px; font-size:11px; color:#666; box-shadow:0 2px 6px rgba(0,0,0,.06); cursor:pointer; }
    .songs-setlist-bar button.danger{ color:#c0392b; }
    .songs-check-item{ display:flex; align-items:center; gap:8px; }
    .songs-check-item input{ width:18px; height:18px; flex-shrink:0; }

    .songs-detail-header{ position:sticky; top:0; z-index:40; background:#fff; border-radius:16px; padding:12px 12px 10px; margin-bottom:10px; box-shadow:0 6px 18px rgba(0,0,0,.09); will-change:transform; transform:translateZ(0); backface-visibility:hidden; }
    .songs-topbar{ display:flex; align-items:center; gap:8px; margin-bottom:8px; }
    .songs-back{ border:none; background:#fdf1f5; padding:7px 11px; border-radius:9px; font-size:12px; color:#d47ab0; cursor:pointer; flex-shrink:0; }
    .songs-title-block{ flex:1; min-width:0; }
    .songs-title-block .t{ font-size:15px; font-weight:800; color:#345f80; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .songs-title-block .a{ font-size:11px; color:#9bb; }
    .songs-topbar-actions{ display:flex; gap:6px; flex-shrink:0; flex-wrap:wrap; }
    .songs-topbar-actions button{ border:none; padding:8px 13px; border-radius:9px; font-size:12px; color:#666; background:#f2f2f2; cursor:pointer; white-space:nowrap; }
    .songs-topbar-actions button.primary{ background:#ff8fab; color:#fff; font-weight:700; }

    .songs-bottom-bar{ position:fixed; left:12px; right:12px; bottom:12px; z-index:45; background:#fff; border-radius:14px; padding:7px 12px; box-shadow:0 4px 16px rgba(0,0,0,.15); display:flex; align-items:center; justify-content:space-between; gap:10px; }
    .songs-bottom-spacer{ height:64px; }
    .songs-bottom-group{ display:flex; align-items:center; gap:6px; }
    .songs-bottom-bar button{ border:none; background:#f4f9ff; border-radius:8px; padding:5px 9px; font-size:13px; cursor:pointer; }
    .songs-bottom-bar #songs-lyrics-fs-label, .songs-bottom-bar #songs-scroll-speed-label{ font-size:11px; font-weight:700; color:#666; min-width:30px; text-align:center; }
    .songs-bottom-label{ font-size:10px; color:#999; white-space:nowrap; }
    .songs-bottom-bar input[type="range"]{ width:60px; }

    .songs-toolbar{ display:flex; gap:6px; flex-wrap:wrap; justify-content:center; background:#fdf7fa; padding:7px 8px; border-radius:14px; margin-bottom:6px; }
    .songs-tool{ border:none; background:#fff; border-radius:10px; padding:6px 10px; font-size:16px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:1px; min-width:46px; }
    .songs-tool span{ font-size:9px; color:#666; }
    .songs-tool.active{ background:#ff8fab; }
    .songs-tool.active span{ color:#fff; }
    .songs-subpanel{ display:none; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; background:#fafafa; border-radius:12px; padding:8px; margin-bottom:6px; }
    .songs-subpanel.show{ display:flex; }
    .songs-subpanel .grp{ display:flex; gap:5px; align-items:center; }
    .songs-subpanel .grp-label{ font-size:10px; color:#999; margin-right:2px; }
    .songs-swatches{ display:flex; gap:5px; align-items:center; }
    .songs-swatch{ width:19px; height:19px; border-radius:50%; cursor:pointer; border:2px solid #ddd; }
    .songs-swatch.sel{ border-color:#333; transform:scale(1.15); }
    .songs-stickerchoice{ font-size:22px; background:#fff; border:2px solid transparent; border-radius:8px; padding:3px 7px; cursor:pointer; }
    .songs-stickerchoice.sel{ background:#fff0f5; border-color:#ff8fab; transform:scale(1.15); }
    .songs-size-btn{ border:none; background:#fff; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; width:34px; height:30px; }
    .songs-size-btn.sel{ background:#ff8fab; }
    .songs-size-btn .linebar{ display:block; width:22px; border-radius:99px; background:#555; }
    .songs-size-btn.sel .linebar{ background:#fff; }
    .songs-mode-btn{ border:none; background:#fff; border-radius:8px; padding:5px 10px; font-size:11px; cursor:pointer; color:#666; }
    .songs-mode-btn.sel{ background:#4d96ff; color:#fff; }
    .songs-toggle-btn{ border:none; background:#fff; border-radius:8px; padding:5px 10px; font-size:11px; cursor:pointer; color:#666; }
    .songs-toggle-btn.sel{ background:#6bcB77; color:#fff; }

    .songs-page{ position:relative; width:100%; min-height:200px; background:#fff8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.14); overflow:hidden; }
    .songs-lyrics{ position:relative; padding:26px 20px 26px 50px; pointer-events:none; }
    .songs-lyrics h2{ text-align:center; font-size:16pt; font-weight:700; color:#d47ab0; margin:0 0 2px; }
    .songs-lyrics .artist{ text-align:center; font-size:9pt; color:#999; margin-bottom:20px; }
    .songs-single{ width:100%; box-sizing:border-box; }
    .songs-section{ margin-top:8px; margin-bottom:8px; }
    .songs-seclabel{ font-size:7pt; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#aaa; margin-bottom:1px; }
    .songs-seclabel.chorus{ color:#c0392b; } .songs-seclabel.bridge{ color:#2980b9; } .songs-seclabel.rap{ color:#8e44ad; } .songs-seclabel.instrumental,.songs-seclabel.intro,.songs-seclabel.outro,.songs-seclabel.interlude{ color:#27ae60; }
    .songs-line{ color:#333; }
    .songs-line-sub{ display:flex; flex-direction:column; align-items:flex-start; line-height:1.25 !important; margin:3px 0; }
    .songs-line-sub .sub-caption{ font-size:0.6em; color:#9ab; line-height:1.2; }
    .songs-line-sub .main-text{ font-size:1em; line-height:1.3; }
    .songs-overlay{ position:absolute; inset:0; }
    .songs-canvas{ position:absolute; inset:0; width:100%; height:100%; }
    .songs-page:not(.readonly) .songs-canvas{ touch-action:none; -webkit-user-select:none; user-select:none; -webkit-touch-callout:none; }
    .songs-eraser-cursor{ position:absolute; border:2px solid #4d96ff; background:rgba(77,150,255,.15); border-radius:50%; pointer-events:none; transform:translate(-50%,-50%); display:none; z-index:5; }
    .songs-page:not(.readonly) .songs-note-wrap{ touch-action:none; }
    .songs-note-wrap{ position:absolute; width:220px; height:74px; min-width:60px; min-height:24px; max-width:340px; max-height:260px; box-sizing:border-box; cursor:grab; }
    .songs-note{ width:100%; height:100%; background:#fff9c4; border:2px solid #f0e08a; border-radius:6px; box-shadow:0 2px 5px rgba(0,0,0,.15); box-sizing:border-box; overflow:auto; scrollbar-width:none; -ms-overflow-style:none; }
    .songs-note::-webkit-scrollbar{ display:none; }
    .songs-note-text{ padding:4px 6px; font-size:11px; outline:none; white-space:pre-wrap; overflow-wrap:break-word; box-sizing:border-box; min-height:100%; }
    .songs-note-wrap .resize.corner{ position:absolute; right:-6px; bottom:-6px; width:15px; height:15px; background:#4d96ff; border-radius:4px; cursor:nwse-resize; display:none; }
    .songs-note-wrap .resize.corner::after{ content:''; position:absolute; right:3px; bottom:3px; width:6px; height:6px; border-right:2px solid #fff; border-bottom:2px solid #fff; }
    .songs-page:not(.readonly) .songs-note-wrap .resize.corner{ display:block; }
    .songs-page.readonly .songs-note-wrap .resize.corner{ display:none !important; }
    .songs-note.noborder{ background:transparent; border:none; box-shadow:none; }
    .songs-note-wrap .del{ position:absolute; top:-14px; right:-14px; width:16px; height:16px; background:#ff6b6b; color:#fff; border-radius:50%; font-size:9px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
    .songs-note-wrap .done{ position:absolute; top:-14px; left:-14px; width:18px; height:18px; background:#6bcB77; color:#fff; border-radius:50%; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; cursor:pointer; }
    .songs-page:not(.readonly) .songs-sticker{ touch-action:none; }
    .songs-sticker{ position:absolute; font-size:28px; cursor:grab; user-select:none; filter:drop-shadow(0 2px 3px rgba(0,0,0,.2)); }
    .songs-sticker .del{ position:absolute; top:-5px; right:-9px; width:14px; height:14px; background:#ff6b6b; color:#fff; border-radius:50%; font-size:9px; line-height:14px; text-align:center; display:none; }
    .songs-sticker .resize{ position:absolute; width:16px; height:16px; background:#4d96ff; color:#fff; border-radius:50%; font-size:10px; line-height:16px; text-align:center; display:none; }
    .songs-sticker .resize.grow{ bottom:-6px; right:-6px; } .songs-sticker .resize.shrink{ bottom:-6px; left:-6px; }
    .songs-sticker.sel .del, .songs-sticker.sel .resize{ display:block; }
    .songs-page.readonly .songs-canvas{ pointer-events:none; }
    .songs-page.readonly .songs-note-wrap{ pointer-events:none; cursor:default; }
    .songs-page.readonly .songs-note-wrap .del{ display:none !important; }
    .songs-page.readonly .songs-note-wrap .done{ display:none !important; }
    .songs-page.readonly .songs-sticker{ pointer-events:none; cursor:default; }
    .songs-hint{ font-size:10px; color:#a88; margin-top:6px; text-align:center; }
  `;
  document.head.appendChild(style);
}

/* ===================== HELPERS ===================== */
function songLetterOf(str){ const c=(str||'').trim()[0]||'#'; return /[0-9]/.test(c) ? '0-9' : c.toUpperCase(); }
function songKey(id){ return SONG_STORAGE_PREFIX+id; }
function songHasNote(id){
  const raw=localStorage.getItem(songKey(id));
  if(!raw) return false;
  try{ const d=JSON.parse(raw); return (d.strokes&&d.strokes.length)||(d.notes&&d.notes.length)||(d.stickers&&d.stickers.length); }
  catch(e){ return false; }
}
function songLoadData(id){
  const raw=localStorage.getItem(songKey(id));
  if(!raw) return {strokes:[],notes:[],stickers:[]};
  try{ const d=JSON.parse(raw); return {strokes:d.strokes||[],notes:d.notes||[],stickers:d.stickers||[]}; }
  catch(e){ return {strokes:[],notes:[],stickers:[]}; }
}
function songById(id){ return SONGS.find(s=>s.id===id); }

/* ===================== SETLISTS ===================== */
function songGetSetlists(){
  try{ return JSON.parse(localStorage.getItem(SONG_SETLIST_KEY)||'[]'); }
  catch(e){ return []; }
}
function songSaveSetlists(list){ localStorage.setItem(SONG_SETLIST_KEY, JSON.stringify(list)); }
function songCurrentSetlist(){ return songGetSetlists().find(s=>s.id===songState.activeSetlistId) || null; }
function songCreateSetlist(){
  const name = prompt('Name this setlist (e.g. "5 songs to practice this week")');
  if(!name || !name.trim()) return;
  const list = songGetSetlists();
  const id = 'sl_'+Date.now();
  list.push({id, name: name.trim(), songIds: []});
  songSaveSetlists(list);
  songState.activeSetlistId = id;
  songState.setlistManageMode = true;
  songsRerender();
}
function songSelectSetlist(id){
  songState.activeSetlistId = id;
  songState.setlistManageMode = false;
  songState.searchQuery = '';
  songsRerender();
}
function songSelectAllSongs(){
  songState.activeSetlistId = null;
  songState.setlistManageMode = false;
  songsRerender();
}
function songToggleSetlistManage(){
  songState.setlistManageMode = !songState.setlistManageMode;
  songsRerender();
}
function songDeleteSetlist(id){
  const list = songGetSetlists();
  const sl = list.find(s=>s.id===id);
  if(!sl) return;
  if(!confirm(`Delete setlist "${sl.name}"? (The songs themselves won't be deleted)`)) return;
  songSaveSetlists(list.filter(s=>s.id!==id));
  if(songState.activeSetlistId===id){ songState.activeSetlistId=null; songState.setlistManageMode=false; }
  songsRerender();
}
function songToggleSongInSetlist(songId){
  const list = songGetSetlists();
  const sl = list.find(s=>s.id===songState.activeSetlistId);
  if(!sl) return;
  const i = sl.songIds.indexOf(songId);
  if(i>=0) sl.songIds.splice(i,1); else sl.songIds.push(songId);
  songSaveSetlists(list);
  songsRerender();
}
function renderSetlistRow(){
  const setlists = songGetSetlists();
  const chips = [
    `<button class="songs-setlist-chip${!songState.activeSetlistId?' active':''}" onclick="songSelectAllSongs()">📚 All Songs</button>`,
    ...setlists.map(sl=>`<button class="songs-setlist-chip${songState.activeSetlistId===sl.id?' active':''}" onclick="songSelectSetlist('${sl.id}')">🎧 ${sl.name} (${sl.songIds.length})</button>`),
    `<button class="songs-setlist-chip new" onclick="songCreateSetlist()">＋ New Setlist</button>`
  ];
  return `<div class="songs-setlist-row">${chips.join('')}</div>`;
}
let songLyricsFontSize = 16; // always starts at 16pt fresh — not persisted across sessions
function songSetLyricsZoom(delta){
  songLyricsFontSize = Math.max(9, Math.min(28, songLyricsFontSize+delta));
  songRefreshLyricsFontSize();
}
function songRefreshLyricsFontSize(){
  const styleEl=document.getElementById('songs-lyrics-fontsize-style');
  if(styleEl) styleEl.textContent = `#songs-detail-page .songs-line{font-size:${songLyricsFontSize}pt;line-height:1.9;}`;
  const label=document.getElementById('songs-lyrics-fs-label');
  if(label) label.textContent = songLyricsFontSize+'pt';
  if(songState.view==='detail' && songState.mode!=='clean') songResizeCanvas();
}
function songSectionLabel(sec){
  let base = SONG_TYPE_LABEL[sec.type] || ('▸ '+sec.type);
  if(sec.type==='verse' && sec.num) base = '▸ Verse '+sec.num;
  if(sec.type==='rap' && sec.num) base = '🎤 Rap '+sec.num;
  if(sec.repeat) base += ' *';
  return base;
}
function songSectionLabelClass(sec){
  if(sec.type==='chorus') return 'chorus';
  if(sec.type==='bridge') return 'bridge';
  if(sec.type==='rap') return 'rap';
  if(['instrumental','intro','outro','interlude'].includes(sec.type)) return sec.type;
  return '';
}

/* ===================== ROOT RENDER ===================== */
function renderSongs(){
  ensureSongsStyle();
  return `<div id="songs-root">${songState.view==='home' ? renderSongsHome() : renderSongDetail()}</div>`;
}
function songsRerender(){
  const root=document.getElementById('songs-root');
  if(!root) return;
  root.innerHTML = songState.view==='home' ? renderSongsHome() : renderSongDetail();
  songsPostRender();
}
function initSongsTab(){ ensureSongsStyle(); songsPostRender(); }
function songsPostRender(){
  if(songState.view==='detail'){
    songSetupDetailDom();
  }
}

/* ===================== HOME ===================== */
function songMatches(s,q){
  return [s.titleEn,s.titleTh,s.artistEn,s.artistTh].some(v=>(v||'').toLowerCase().includes(q));
}
function songItemHtml(s){
  const badge = songHasNote(s.id) ? '<span class="badge">📝</span>' : '';
  const titleTh = s.titleTh ? ` <span class="th">(${s.titleTh})</span>` : '';
  const artistTh = s.artistTh ? ` <span class="th">(${s.artistTh})</span>` : '';
  return `<div class="songs-item" onclick="songOpen('${s.id}')">
    <div class="t">${s.artistIcon||'🎵'} ${s.titleEn}${titleTh}${badge}</div>
    <div class="a">${s.artistEn}${artistTh}</div>
  </div>`;
}
function songTitleOnlyItemHtml(s){
  const badge = songHasNote(s.id) ? '<span class="badge">📝</span>' : '';
  const titleTh = s.titleTh ? ` <span class="th">(${s.titleTh})</span>` : '';
  return `<div class="songs-item" onclick="songOpen('${s.id}')">
    <div class="t">${s.titleEn}${titleTh}${badge}</div>
  </div>`;
}
function songCheckItemHtml(s, sl){
  const inSetlist = sl.songIds.includes(s.id);
  const titleTh = s.titleTh ? ` <span class="th">(${s.titleTh})</span>` : '';
  return `<div class="songs-item songs-check-item" onclick="songToggleSongInSetlist('${s.id}')">
    <input type="checkbox" ${inSetlist?'checked':''} onclick="event.stopPropagation();songToggleSongInSetlist('${s.id}')">
    <div style="flex:1">
      <div class="t">${s.artistIcon||'🎵'} ${s.titleEn}${titleTh}</div>
      <div class="a">${s.artistEn}</div>
    </div>
  </div>`;
}

function renderSongsHome(){
  const header = `
    <div class="songs-home-header">
      <h2>🎵 Walnut Song</h2>
      <div class="sub">Walnut's lyrics collection</div>
    </div>
    ${renderSetlistRow()}
  `;

  // ── Manage mode: pick which songs belong to the active setlist ──
  if(songState.activeSetlistId && songState.setlistManageMode){
    const sl = songCurrentSetlist();
    if(!sl){ songState.activeSetlistId=null; songState.setlistManageMode=false; return renderSongsHome(); }
    const items = SONGS.slice().sort((a,b)=>a.titleEn.localeCompare(b.titleEn)).map(s=>songCheckItemHtml(s, sl)).join('');
    return `${header}
      <div class="songs-setlist-bar">
        <div class="name">✎ Pick songs for "${sl.name}"</div>
        <button onclick="songToggleSetlistManage()">✓ Done</button>
      </div>
      <div>${items}</div>`;
  }

  // ── Viewing one setlist ──
  if(songState.activeSetlistId){
    const sl = songCurrentSetlist();
    if(!sl){ songState.activeSetlistId=null; return renderSongsHome(); }
    const songs = sl.songIds.map(songById).filter(Boolean);
    const listHtml = songs.length ? songs.map(songItemHtml).join('') : '<div class="songs-empty">No songs in this setlist yet — tap "Edit Songs" to add some</div>';
    return `${header}
      <div class="songs-setlist-bar">
        <div class="name">🎧 ${sl.name}</div>
        <button onclick="songToggleSetlistManage()">✎ Edit Songs</button>
        <button class="danger" onclick="songDeleteSetlist('${sl.id}')">🗑️ Delete</button>
      </div>
      <div>${listHtml}</div>`;
  }

  // ── Default: browse all songs ──
  const q = (songState.searchQuery||'').trim().toLowerCase();
  const field = songState.sortMode==='title' ? 'titleEn' : 'artistEn';
  let azHtml='', listHtml='';

  if(q){
    const results = SONGS.filter(s=>songMatches(s,q)).sort((a,b)=>a[field].localeCompare(b[field]));
    listHtml = results.length ? results.map(songItemHtml).join('') : '<div class="songs-empty">No matching songs found</div>';
  } else {
    const groups={};
    SONGS.forEach(s=>{ const l=songLetterOf(s[field]); (groups[l]=groups[l]||[]).push(s); });
    Object.values(groups).forEach(arr=>arr.sort((a,b)=>a[field].localeCompare(b[field])));
    azHtml = SONG_ALPHABET.map(l=>{
      const has=!!groups[l];
      return `<button class="${has?'':'disabled'}" ${has?`onclick="songScrollToLetter('${l}')"`:''}>${l}</button>`;
    }).join('');
    if(songState.sortMode==='artist'){
      listHtml = SONG_ALPHABET.filter(l=>groups[l]).map(l=>{
        const byArtist={};
        groups[l].forEach(s=>{ (byArtist[s.artistEn]=byArtist[s.artistEn]||[]).push(s); });
        const artistBlocks = Object.keys(byArtist).sort((a,b)=>a.localeCompare(b)).map(name=>{
          const songsForArtist = byArtist[name].slice().sort((a,b)=>a.titleEn.localeCompare(b.titleEn));
          const icon = songsForArtist[0].artistIcon || '🎵';
          const thaiName = songsForArtist[0].artistTh ? ` <span class="th">(${songsForArtist[0].artistTh})</span>` : '';
          return `<div class="songs-artist-group">
            <div class="songs-artist-header">${icon} ${name}${thaiName}</div>
            ${songsForArtist.map(songTitleOnlyItemHtml).join('')}
          </div>`;
        }).join('');
        return `<div class="songs-section-hd" id="song-sec-${l}">${l}</div>${artistBlocks}`;
      }).join('');
    } else {
      listHtml = SONG_ALPHABET.filter(l=>groups[l]).map(l=>
        `<div class="songs-section-hd" id="song-sec-${l}">${l}</div>`+groups[l].map(songItemHtml).join('')
      ).join('');
    }
  }

  return `${header}
    <input id="songs-search" placeholder="Search by song title or artist..." value="${songState.searchQuery||''}" oninput="songOnSearch(this.value)">
    <div class="songs-seg">
      <button class="${songState.sortMode==='title'?'active':''}" onclick="songSetSort('title')">By Title</button>
      <button class="${songState.sortMode==='artist'?'active':''}" onclick="songSetSort('artist')">By Artist</button>
    </div>
    ${q ? '' : `<div class="songs-az">${azHtml}</div>`}
    <div>${listHtml}</div>
  `;
}
function songOnSearch(v){ songState.searchQuery=v; const listArea=document.getElementById('songs-root'); if(listArea){ /* re-render but keep focus */ }
  const root=document.getElementById('songs-root');
  root.innerHTML = renderSongsHome();
  const input=document.getElementById('songs-search');
  if(input){ input.focus(); input.selectionStart=input.selectionEnd=input.value.length; }
}
function songSetSort(m){ songState.sortMode=m; songsRerender(); }
function songScrollToLetter(l){ const el=document.getElementById('song-sec-'+l); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }

/* ===================== AUTO-SCROLL (teleprompter) ===================== */
function songGetScrollContainer(){
  // the header above (topbar/controls) is position:sticky, so scrolling this
  // container moves the lyrics page while the header stays put.
  return document.getElementById('song-scroll-container') || document.scrollingElement || document.documentElement;
}
function songScrollStep(ts){
  const el = songGetScrollContainer();
  if(!el){ songScrollRAF=null; return; }
  if(songScrollLastTime==null){ songScrollLastTime=ts; songScrollAccPos=el.scrollTop; }
  const dt=(ts-songScrollLastTime)/1000;
  songScrollLastTime=ts;
  const pxPerSec = SONG_SCROLL_SPEEDS[songScrollSpeed-1];
  // accumulate in a private float — el.scrollTop itself gets rounded to whole
  // pixels by the browser, so reading it back each frame would silently drop
  // sub-pixel increments at low speed and freeze the scroll.
  songScrollAccPos += pxPerSec*dt;
  el.scrollTop = songScrollAccPos;
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight-2;
  if(atBottom){ songStopAutoScroll(); return; }
  songScrollRAF = requestAnimationFrame(songScrollStep);
}
function songStartAutoScroll(){
  songScrollLastTime=null;
  songScrollAccPos=null;
  songScrollRAF = requestAnimationFrame(songScrollStep);
  const btn=document.getElementById('songs-scroll-btn');
  if(btn) btn.textContent='⏸';
}
function songStopAutoScroll(){
  if(songScrollRAF) cancelAnimationFrame(songScrollRAF);
  songScrollRAF=null;
  const btn=document.getElementById('songs-scroll-btn');
  if(btn) btn.textContent='▶️';
}
function songToggleAutoScroll(){
  if(songScrollRAF) songStopAutoScroll(); else songStartAutoScroll();
}
function songSetScrollSpeed(v){
  songScrollSpeed=parseInt(v,10);
  localStorage.setItem(SONG_SCROLL_SPEED_KEY, String(songScrollSpeed));
  const label=document.getElementById('songs-scroll-speed-label');
  if(label) label.textContent='Lv.'+songScrollSpeed;
}

function songResetScroll(){
  const el=songGetScrollContainer();
  if(el) el.scrollTop=0;
}
function songOpen(id){
  songStopAutoScroll();
  songActiveNote=null;
  songState.currentId=id;
  songState.view='detail';
  songState.mode='clean';
  songsRerender();
  songResetScroll();
}
function songGoBack(){
  if(songState.mode==='edit' && !songConfirmDiscardIfChanged()) return;
  songStopAutoScroll();
  songState.view='home';
  songState.currentId=null;
  songsRerender();
  songResetScroll();
}

/* ===================== DETAIL ===================== */
function songRenderLyricLine(l){
  if(l && typeof l === 'object'){
    return `<div class="songs-line songs-line-sub"><div class="sub-caption">${l.sub}</div><div class="main-text">${l.text||'&nbsp;'}</div></div>`;
  }
  return `<div class="songs-line">${l||'&nbsp;'}</div>`;
}
function renderSongLyricsHtml(song){
  const secHtml = song.sections.map(sec=>`
    <div class="songs-section">
      <div class="songs-seclabel ${songSectionLabelClass(sec)}">${songSectionLabel(sec)}</div>
      ${sec.lines.map(songRenderLyricLine).join('')}
    </div>`).join('');

  const titleTh = song.titleTh ? ` (${song.titleTh})` : '';
  return `
    <h2>${song.titleEn}${titleTh}</h2>
    <div class="artist">${song.artistIcon||''} ${song.artistEn}</div>
    <div class="songs-single">${secHtml}</div>
    <style id="songs-lyrics-fontsize-style">#songs-detail-page .songs-line{font-size:${songLyricsFontSize}pt;line-height:1.9;}</style>
  `;
}

function renderSongDetail(){
  const song = songById(songState.currentId);
  if(!song){ songState.view='home'; return renderSongsHome(); }
  const titleTh = song.titleTh ? ` (${song.titleTh})` : '';
  const artistTh = song.artistTh ? ` (${song.artistTh})` : '';

  let actionRow;
  if(songState.mode==='clean'){
    const saved = songHasNote(song.id);
    actionRow = saved
      ? `<button onclick="songEnterView()">📝 View Saved Notes</button><button class="primary" onclick="songEnterEdit()">✏️ Write/Edit Notes</button>`
      : `<button class="primary" onclick="songEnterEdit()">✏️ Start Writing Notes</button>`;
  } else if(songState.mode==='view'){
    actionRow = `<button onclick="songSetMode('clean')">Close (plain lyrics)</button><button class="primary" onclick="songEnterEdit()">✏️ Edit Notes</button>`;
  } else {
    actionRow = '';
  }

  const headerActions = songState.mode==='edit'
    ? `<button onclick="songCancelEdit()">✖️ Cancel</button><button class="primary" onclick="songSaveEdit()">💾 Save</button>`
    : actionRow;

  const dotBtn = (px)=>`<span class="linebar" style="height:${px}px"></span>`;

  return `
    <div class="songs-detail-header">
      <div class="songs-topbar">
        <button class="songs-back" onclick="songGoBack()">← Back</button>
        <div class="songs-title-block">
          <div class="t">${song.titleEn}${titleTh}</div>
          <div class="a">${song.artistEn}${artistTh}</div>
        </div>
        <div class="songs-topbar-actions">${headerActions}</div>
      </div>
      <div class="songs-toolbar" id="songs-toolbar" style="display:${songState.mode==='edit'?'flex':'none'}">
        <button class="songs-tool" data-tool="pencil" onclick="songSelectTool('pencil')">✏️<span>Pencil</span></button>
        <button class="songs-tool" data-tool="eraser" onclick="songSelectTool('eraser')">🧽<span>Eraser</span></button>
        <button class="songs-tool" data-tool="text" onclick="songSelectTool('text')">💬<span>Note</span></button>
        <button class="songs-tool" data-tool="sticker" onclick="songSelectTool('sticker')">⭐<span>Sticker</span></button>
        <button class="songs-tool" onclick="songUndo()">↩️<span>Undo</span></button>
      </div>
      <div class="songs-subpanel" id="songs-pencilpanel">
        <div class="songs-swatches" id="songs-swatches"></div>
        <div class="grp">
          <span class="grp-label">Size</span>
          <button class="songs-size-btn" data-size="xs" onclick="songSetBrushSize('xs')">${dotBtn(3)}</button>
          <button class="songs-size-btn" data-size="s" onclick="songSetBrushSize('s')">${dotBtn(6)}</button>
          <button class="songs-size-btn" data-size="m" onclick="songSetBrushSize('m')">${dotBtn(11)}</button>
          <button class="songs-size-btn" data-size="l" onclick="songSetBrushSize('l')">${dotBtn(18)}</button>
        </div>
      </div>
      <div class="songs-subpanel" id="songs-eraserpanel">
        <div class="grp">
          <button class="songs-mode-btn" data-mode="stroke" onclick="songSetEraserMode('stroke')">🧽 Erase Line</button>
          <button class="songs-mode-btn" data-mode="pixel" onclick="songSetEraserMode('pixel')">🩹 Erase Point</button>
        </div>
        <div class="grp">
          <span class="grp-label">Size</span>
          <button class="songs-size-btn" data-esize="s" onclick="songSetEraserSize('s')">${dotBtn(4)}</button>
          <button class="songs-size-btn" data-esize="m" onclick="songSetEraserSize('m')">${dotBtn(8)}</button>
          <button class="songs-size-btn" data-esize="l" onclick="songSetEraserSize('l')">${dotBtn(16)}</button>
        </div>
      </div>
      <div class="songs-subpanel" id="songs-notepanel">
        <div class="grp">
          <button class="songs-toggle-btn" data-border="1" onclick="songSetNoteBorder(true)">▭ Border</button>
          <button class="songs-toggle-btn" data-border="0" onclick="songSetNoteBorder(false)">⬚ No Border</button>
        </div>
        <div class="grp">
          <span class="grp-label">Size</span>
          <button class="songs-mode-btn" data-nfs="s" onclick="songSetNoteFontSize('s')">A⁻</button>
          <button class="songs-mode-btn" data-nfs="m" onclick="songSetNoteFontSize('m')">A</button>
          <button class="songs-mode-btn" data-nfs="l" onclick="songSetNoteFontSize('l')">A⁺</button>
        </div>
        <div class="songs-swatches" id="songs-note-swatches"></div>
      </div>
      <div class="songs-subpanel" id="songs-stickerpanel"></div>
    </div>
    <div class="songs-page ${songState.mode==='edit'?'':'readonly'}" id="songs-detail-page">
      <div class="songs-lyrics" id="songs-lyrics-layer">${renderSongLyricsHtml(song)}</div>
      <div class="songs-overlay" id="songs-overlay" style="display:${songState.mode==='clean'?'none':'block'}">
        <canvas class="songs-canvas" id="songs-canvas"></canvas>
        <div class="songs-eraser-cursor" id="songs-eraser-cursor"></div>
      </div>
    </div>
    <div class="songs-hint" style="display:${songState.mode==='edit'?'block':'none'}">Tap "Save" up top when you're done — you'll be asked to confirm before it overwrites the previous version</div>
    <div class="songs-bottom-bar">
      <div class="songs-bottom-group">
        <span class="songs-bottom-label">Text size</span>
        <button onclick="songSetLyricsZoom(-1)">🔍－</button>
        <span id="songs-lyrics-fs-label">${songLyricsFontSize}pt</span>
        <button onclick="songSetLyricsZoom(1)">🔍＋</button>
      </div>
      <div class="songs-bottom-group">
        <span class="songs-bottom-label">Autoscroll</span>
        <button id="songs-scroll-btn" onclick="songToggleAutoScroll()">${songScrollRAF?'⏸':'▶️'}</button>
        <input type="range" min="1" max="10" step="1" value="${songScrollSpeed}" oninput="songSetScrollSpeed(this.value)">
        <span id="songs-scroll-speed-label">Lv.${songScrollSpeed}</span>
      </div>
    </div>
    <div class="songs-bottom-spacer"></div>
  `;
}

/* ===================== MODE ===================== */
function songSetMode(m){
  songState.mode=m;
  songsRerender();
  if(m==='view' || m==='edit') songLoadWorkingIntoDom();
}
function songEnterView(){
  songLoadWorkingFromStorage();
  songSetMode('view');
}
function songEnterEdit(){
  if(songState.mode!=='view') songLoadWorkingFromStorage();
  songState.snapshot = songCurrentWorkingJSON();
  songSetMode('edit');
}
function songLoadWorkingFromStorage(){
  const d=songLoadData(songState.currentId);
  songState.strokes=JSON.parse(JSON.stringify(d.strokes));
  songState.notes=JSON.parse(JSON.stringify(d.notes));
  songState.stickers=JSON.parse(JSON.stringify(d.stickers));
  songActiveNote=null;
}
function songSerializeNote(n){ return {x:n.x,y:n.y,text:n.text,border:n.border,fontSize:n.fontSize,color:n.color,width:n.width,height:n.height}; }
function songSerializeSticker(s){ return {x:s.x,y:s.y,emoji:s.emoji,size:s.size}; }
function songCurrentWorkingJSON(){
  return JSON.stringify({
    strokes: songState.strokes,
    notes: songState.notes.map(songSerializeNote),
    stickers: songState.stickers.map(songSerializeSticker)
  });
}
function songSaveEdit(){
  const already = songHasNote(songState.currentId);
  const msg = already ? 'Overwrite the existing saved notes?' : 'Save these notes?';
  if(!confirm(msg)) return;
  const data = {
    strokes: songState.strokes,
    notes: songState.notes.map(songSerializeNote),
    stickers: songState.stickers.map(songSerializeSticker),
    savedAt: Date.now()
  };
  localStorage.setItem(songKey(songState.currentId), JSON.stringify(data));
  songSetMode('clean');
}
function songConfirmDiscardIfChanged(){
  const nowJSON = songCurrentWorkingJSON();
  if(nowJSON !== songState.snapshot){
    return confirm('You have unsaved changes. Discard them and cancel?');
  }
  return true;
}
function songCancelEdit(){
  if(!songConfirmDiscardIfChanged()) return;
  songSetMode('clean');
}

/* ===================== TOOLBAR ===================== */
function songBuildColorSwatches(containerId, current, onPick, colors){
  const el=document.getElementById(containerId);
  if(!el) return;
  el.innerHTML='';
  (colors||SONG_COLORS).forEach(c=>{
    const d=document.createElement('div');
    d.className='songs-swatch'+(c===current?' sel':'');
    d.style.background=c;
    d.onclick=()=>{ onPick(c); el.querySelectorAll('.songs-swatch').forEach(s=>s.classList.remove('sel')); d.classList.add('sel'); };
    el.appendChild(d);
  });
}
function songBuildSwatches(){
  songBuildColorSwatches('songs-swatches', songState.currentColor, (c)=>{ songState.currentColor=c; });
  songBuildColorSwatches('songs-note-swatches', songState.noteColor, (c)=>songSetNoteColor(c), SONG_NOTE_COLORS);
}
function songBuildStickerPanel(){
  const el=document.getElementById('songs-stickerpanel');
  if(!el) return;
  el.innerHTML='';
  SONG_STICKERS.forEach(s=>{
    const b=document.createElement('button');
    b.className='songs-stickerchoice'+(songState.selectedSticker===s?' sel':'');
    b.textContent=s;
    b.onclick=()=>{
      songState.selectedSticker=s;
      el.querySelectorAll('.songs-stickerchoice').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel');
    };
    el.appendChild(b);
  });
}
function songSyncToolPanelButtons(){
  document.querySelectorAll('.songs-size-btn[data-size]').forEach(b=>b.classList.toggle('sel', b.dataset.size===songState.brushSize));
  document.querySelectorAll('.songs-size-btn[data-esize]').forEach(b=>b.classList.toggle('sel', b.dataset.esize===songState.eraserSize));
  document.querySelectorAll('.songs-mode-btn[data-mode]').forEach(b=>b.classList.toggle('sel', b.dataset.mode===songState.eraserMode));
  document.querySelectorAll('.songs-mode-btn[data-nfs]').forEach(b=>b.classList.toggle('sel', b.dataset.nfs===songState.noteFontSize));
  document.querySelectorAll('.songs-toggle-btn[data-border]').forEach(b=>b.classList.toggle('sel', (b.dataset.border==='1')===songState.noteBorder));
}
function songSetBrushSize(sz){ songState.brushSize=sz; songSyncToolPanelButtons(); }
function songSetEraserMode(m){ songState.eraserMode=m; if(m!=='pixel') songHideEraserCursor(); songSyncToolPanelButtons(); }
function songSetEraserSize(sz){ songState.eraserSize=sz; songSyncToolPanelButtons(); }
function songGetActiveNote(){
  if(songActiveNote && songState.notes.includes(songActiveNote)) return songActiveNote;
  const focused = songState.notes.find(n=>n._textEl===document.activeElement);
  if(focused) return focused;
  return songState.notes[songState.notes.length-1] || null;
}
function songSetNoteBorder(v){
  songState.noteBorder=v;
  const n=songGetActiveNote();
  if(n){ n.border=v; songRefreshNoteEl(n); }
  songSyncToolPanelButtons();
}
function songSetNoteFontSize(sz){
  songState.noteFontSize=sz;
  const n=songGetActiveNote();
  if(n){ n.fontSize=SONG_NOTE_FONT_SIZES[sz]; songRefreshNoteEl(n); }
  songSyncToolPanelButtons();
}
function songSetNoteColor(c){
  songState.noteColor=c;
  const n=songGetActiveNote();
  if(n){ n.color=c; songRefreshNoteEl(n); }
}
function songRefreshNoteEl(note){
  const el=note._el, textEl=note._textEl;
  if(!el||!textEl) return;
  el.className='songs-note'+(note.border===false?' noborder':'');
  el.style.borderColor = note.border===false ? '' : (note.color==='#ffffff' ? '#555555' : (note.color||'#f0e08a'));
  el.style.background = songNoteBackground(note);
  songCenterTextInline(textEl);
  textEl.style.fontSize=(note.fontSize||SONG_NOTE_FONT_SIZES.m)+'px';
  textEl.style.color=note.color||'#333333';
}
function songSelectTool(tool){
  songState.currentTool=tool;
  songHideEraserCursor();
  document.querySelectorAll('.songs-tool').forEach(b=>b.classList.remove('active'));
  const btn=document.querySelector(`.songs-tool[data-tool="${tool}"]`);
  if(btn) btn.classList.add('active');
  document.getElementById('songs-pencilpanel').classList.toggle('show', tool==='pencil');
  document.getElementById('songs-eraserpanel').classList.toggle('show', tool==='eraser');
  document.getElementById('songs-notepanel').classList.toggle('show', tool==='text');
  document.getElementById('songs-stickerpanel').classList.toggle('show', tool==='sticker');
  songSyncToolPanelButtons();
}

/* ===================== CANVAS / DOM SETUP ===================== */
let songDrawing=false, songCurrentStroke=null;

function songSetupDetailDom(){
  songBuildSwatches();
  songBuildStickerPanel();
  if(songState.mode==='clean') return;
  songLoadWorkingIntoDom();
}
function songLoadWorkingIntoDom(){
  const canvas=document.getElementById('songs-canvas');
  if(!canvas) return;
  songAttachCanvasEvents(canvas);
  songResizeCanvas();
  songRenderOverlayEls();
  if(songState.mode==='edit') songSelectTool(songState.currentTool||'pencil');
}
function songGetPageWrap(){ return document.getElementById('songs-detail-page'); }
function songResizeCanvas(){
  const canvas=document.getElementById('songs-canvas');
  const pageWrap=songGetPageWrap();
  if(!canvas||!pageWrap) return;
  const rect=pageWrap.getBoundingClientRect();
  if(!rect.width) return;
  canvas.width=rect.width*2; canvas.height=rect.height*2;
  canvas.style.width=rect.width+'px'; canvas.style.height=rect.height+'px';
  songRedraw();
}
window.addEventListener('resize', ()=>{ if(songState.view==='detail' && songState.mode!=='clean') songResizeCanvas(); });

function songGetPos(e, canvas){
  const rect=canvas.getBoundingClientRect();
  const cx=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
  const cy=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;
  return {x:cx/rect.width, y:cy/rect.height};
}
function songRedraw(){
  const canvas=document.getElementById('songs-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  songState.strokes.forEach(s=>{
    if(s.points.length<2) return;
    ctx.strokeStyle=s.color;
    ctx.lineWidth=(s.size||SONG_BRUSH_SIZES.m)*(canvas.width/620);
    ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.beginPath();
    s.points.forEach((p,i)=>{ const x=p.x*canvas.width, y=p.y*canvas.height; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
    ctx.stroke();
  });
}
function songAttachCanvasEvents(canvas){
  if(canvas.dataset.songBound) return;
  canvas.dataset.songBound='1';
  canvas.addEventListener('pointerdown',(e)=>{
    if(songState.mode!=='edit') return;
    songUpdateEraserCursor(e, canvas);
    if(songState.currentTool==='text' || songState.currentTool==='sticker') return;
    songDrawing=true;
    const pos=songGetPos(e,canvas);
    if(songState.currentTool==='pencil'){
      songCurrentStroke={color:songState.currentColor, size:SONG_BRUSH_SIZES[songState.brushSize], points:[pos]};
      songState.strokes.push(songCurrentStroke);
    } else if(songState.currentTool==='eraser'){
      songEraseNear(pos);
    }
  });
  canvas.addEventListener('pointermove',(e)=>{
    songUpdateEraserCursor(e, canvas);
    if(!songDrawing || songState.mode!=='edit') return;
    const pos=songGetPos(e,canvas);
    if(songState.currentTool==='pencil' && songCurrentStroke){ songCurrentStroke.points.push(pos); songRedraw(); }
    else if(songState.currentTool==='eraser'){ songEraseNear(pos); }
  });
  canvas.addEventListener('pointerleave', songHideEraserCursor);
  window.addEventListener('pointerup', ()=>{ songDrawing=false; songCurrentStroke=null; });

  const pageWrap=songGetPageWrap();
  if(pageWrap && !pageWrap.dataset.songClickBound){
    pageWrap.dataset.songClickBound='1';
    pageWrap.addEventListener('click',(e)=>{
      if(songState.mode!=='edit') return;
      if(songState.currentTool!=='text' && songState.currentTool!=='sticker') return;
      const overlay=document.getElementById('songs-overlay');
      if(e.target!==canvas && e.target!==pageWrap && e.target!==overlay) return;
      const rect=pageWrap.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width, y=(e.clientY-rect.top)/rect.height;
      if(songState.currentTool==='text') songAddNote(x,y,'');
      else if(songState.currentTool==='sticker' && songState.selectedSticker) songAddSticker(x,y,songState.selectedSticker);
    });
  }
}
function songEraserRadius(){
  return songState.eraserMode==='pixel'
    ? SONG_ERASER_SIZES_PIXEL[songState.eraserSize]
    : SONG_ERASER_SIZES_STROKE[songState.eraserSize];
}
function songUpdateEraserCursor(e, canvas){
  const cursor=document.getElementById('songs-eraser-cursor');
  if(!cursor) return;
  const show = songState.mode==='edit' && songState.currentTool==='eraser' && songState.eraserMode==='pixel';
  if(!show){ cursor.style.display='none'; return; }
  const rect=canvas.getBoundingClientRect();
  const diameterPx = songEraserRadius()*2*rect.width;
  cursor.style.display='block';
  cursor.style.width=diameterPx+'px';
  cursor.style.height=diameterPx+'px';
  cursor.style.left=(e.clientX-rect.left)+'px';
  cursor.style.top=(e.clientY-rect.top)+'px';
}
function songHideEraserCursor(){
  const cursor=document.getElementById('songs-eraser-cursor');
  if(cursor) cursor.style.display='none';
}
function songEraseNear(pos){
  const radius = songEraserRadius();
  if(songState.eraserMode==='pixel') songErasePixel(pos, radius);
  else songEraseStroke(pos, radius);
}
function songEraseStroke(pos, radius){
  let changed=false;
  songState.strokes = songState.strokes.filter(s=>{
    const hit=s.points.some(p=>Math.hypot(p.x-pos.x,p.y-pos.y)<radius);
    if(hit) changed=true;
    return !hit;
  });
  if(changed) songRedraw();
}
function songErasePixel(pos, radius){
  // removes only the points under the eraser, splitting a stroke into
  // separate segments wherever a middle chunk gets erased out.
  let changed=false;
  const newStrokes=[];
  songState.strokes.forEach(s=>{
    const hasHit = s.points.some(p=>Math.hypot(p.x-pos.x,p.y-pos.y)<radius);
    if(!hasHit){ newStrokes.push(s); return; }
    changed=true;
    let current=[];
    s.points.forEach(p=>{
      if(Math.hypot(p.x-pos.x,p.y-pos.y)<radius){
        if(current.length>1) newStrokes.push({color:s.color, size:s.size, points:current});
        current=[];
      } else {
        current.push(p);
      }
    });
    if(current.length>1) newStrokes.push({color:s.color, size:s.size, points:current});
  });
  if(changed){ songState.strokes=newStrokes; songRedraw(); }
}

let songActiveNote = null;

function songAddNote(x,y,text){
  const note={x,y,text, border:songState.noteBorder, fontSize:SONG_NOTE_FONT_SIZES[songState.noteFontSize], color:songState.noteColor};
  songState.notes.push(note);
  songActiveNote = note;
  songRenderNoteEl(note);
}
function songNoteBackground(note){
  if(note.border===false) return '';
  if(note.color==='#ffffff') return '#333333';
  return (note.color||'#f0e08a')+'22';
}
function songCenterTextInline(text){
  // set every centering-relevant property inline (highest possible CSS
  // specificity) so this can never be lost to stylesheet load timing/cache.
  text.style.setProperty('display','flex','important');
  text.style.setProperty('flex-direction','column','important');
  text.style.setProperty('justify-content','center','important');
  text.style.setProperty('align-items','center','important');
  text.style.setProperty('text-align','center','important');
  text.style.setProperty('width','100%','important');
  text.style.setProperty('height','100%','important');
  text.style.setProperty('box-sizing','border-box','important');
}
function songRenderNoteEl(note){
  const overlay=document.getElementById('songs-overlay');
  if(!overlay) return;
  // wrap = position/drag/resize (overflow:visible, so del/resize handle
  //        never get clipped); note = the visible bordered box that
  //        actually scrolls if the text is too long.
  const wrap=document.createElement('div');
  wrap.className='songs-note-wrap';
  wrap.style.left=(note.x*100)+'%'; wrap.style.top=(note.y*100)+'%';
  if(note.width) wrap.style.width=note.width+'px';
  if(note.height) wrap.style.height=note.height+'px';

  const box=document.createElement('div');
  box.className='songs-note'+(note.border===false?' noborder':'');
  box.style.borderColor = note.border===false ? '' : (note.color==='#ffffff' ? '#555555' : (note.color||'#f0e08a'));
  box.style.background = songNoteBackground(note);
  wrap.appendChild(box);

  const text=document.createElement('div');
  text.className='songs-note-text';
  text.contentEditable=(songState.mode==='edit');
  songCenterTextInline(text);
  text.style.fontSize=(note.fontSize||SONG_NOTE_FONT_SIZES.m)+'px';
  text.style.color=note.color||'#333333';
  text.innerText=note.text;
  text.addEventListener('input', ()=>{ note.text=text.innerText; });
  text.addEventListener('pointerdown', ()=>{ if(songState.mode==='edit') songActiveNote=note; });
  box.appendChild(text);
  note._el = box;
  note._textEl = text;

  const del=document.createElement('div');
  del.className='del'; del.textContent='✕';
  del.onclick=(ev)=>{ ev.stopPropagation(); songState.notes=songState.notes.filter(n=>n!==note); if(songActiveNote===note) songActiveNote=null; wrap.remove(); };
  wrap.appendChild(del);

  const done=document.createElement('div');
  done.className='done'; done.textContent='✓';
  done.onclick=(ev)=>{ ev.stopPropagation(); text.blur(); };
  wrap.appendChild(done);

  songMakeNoteResizable(wrap, note);
  songMakeDraggable(wrap, note);
  overlay.appendChild(wrap);
  if(songState.mode==='edit') text.focus();
}
function songMakeNoteResizable(wrap, note){
  const rh=document.createElement('div');
  rh.className='resize corner';
  wrap.appendChild(rh);
  let resizing=false, sx=0, sy=0, startW=0, startH=0;
  rh.addEventListener('pointerdown',(e)=>{
    if(songState.mode!=='edit') return;
    e.stopPropagation();
    resizing=true;
    rh.setPointerCapture(e.pointerId);
    sx=e.clientX; sy=e.clientY;
    startW=wrap.offsetWidth; startH=wrap.offsetHeight;
  });
  rh.addEventListener('pointermove',(e)=>{
    if(!resizing) return;
    e.stopPropagation();
    const nw=Math.max(60, Math.min(340, startW+(e.clientX-sx)));
    const nh=Math.max(24, Math.min(260, startH+(e.clientY-sy)));
    wrap.style.width=nw+'px'; wrap.style.height=nh+'px';
    note.width=nw; note.height=nh;
  });
  rh.addEventListener('pointerup', ()=>{ resizing=false; });
}
function songAddSticker(x,y,emoji){
  const st={x,y,emoji,size:SONG_STICKER_DEFAULT};
  songState.stickers.push(st);
  songRenderStickerEl(st);
}
function songRenderStickerEl(st){
  const overlay=document.getElementById('songs-overlay');
  if(!overlay) return;
  const el=document.createElement('div');
  el.className='songs-sticker';
  el.style.left=(st.x*100)+'%'; el.style.top=(st.y*100)+'%';
  el.style.fontSize=(st.size||SONG_STICKER_DEFAULT)+'px';
  el.textContent=st.emoji;
  const del=document.createElement('div');
  del.className='del'; del.textContent='✕';
  del.onclick=(ev)=>{ ev.stopPropagation(); songState.stickers=songState.stickers.filter(s=>s!==st); el.remove(); };
  el.appendChild(del);
  const grow=document.createElement('div');
  grow.className='resize grow'; grow.textContent='＋';
  grow.onclick=(ev)=>{ ev.stopPropagation(); st.size=Math.min(SONG_STICKER_MAX,(st.size||SONG_STICKER_DEFAULT)+6); el.style.fontSize=st.size+'px'; };
  el.appendChild(grow);
  const shrink=document.createElement('div');
  shrink.className='resize shrink'; shrink.textContent='－';
  shrink.onclick=(ev)=>{ ev.stopPropagation(); st.size=Math.max(SONG_STICKER_MIN,(st.size||SONG_STICKER_DEFAULT)-6); el.style.fontSize=st.size+'px'; };
  el.appendChild(shrink);
  el.addEventListener('click',(ev)=>{ ev.stopPropagation(); document.querySelectorAll('.songs-sticker').forEach(s=>s.classList.remove('sel')); el.classList.add('sel'); });
  songMakeDraggable(el, st);
  overlay.appendChild(el);
}
function songMakeDraggable(el, dataRef){
  let sx,sy,startLeft,startTop,dragging=false;
  el.addEventListener('pointerdown',(e)=>{
    if(songState.mode!=='edit') return;
    if(e.target.classList.contains('del') || e.target.classList.contains('resize') || e.target.classList.contains('done')) return;
    dragging=true;
    el.setPointerCapture(e.pointerId);
    sx=e.clientX; sy=e.clientY;
    const rect=songGetPageWrap().getBoundingClientRect();
    startLeft=dataRef.x*rect.width; startTop=dataRef.y*rect.height;
  });
  el.addEventListener('pointermove',(e)=>{
    if(!dragging) return;
    const rect=songGetPageWrap().getBoundingClientRect();
    const nx=(startLeft+(e.clientX-sx))/rect.width, ny=(startTop+(e.clientY-sy))/rect.height;
    dataRef.x=Math.max(0,Math.min(0.95,nx)); dataRef.y=Math.max(0,Math.min(0.95,ny));
    el.style.left=(dataRef.x*100)+'%'; el.style.top=(dataRef.y*100)+'%';
  });
  el.addEventListener('pointerup', ()=>{ dragging=false; });
}
function songUndo(){
  if(songState.strokes.length){ songState.strokes.pop(); songRedraw(); return; }
  if(songState.stickers.length){ songState.stickers.pop(); songRenderOverlayEls(); return; }
  if(songState.notes.length){ songState.notes.pop(); songRenderOverlayEls(); }
}
function songRenderOverlayEls(){
  const overlay=document.getElementById('songs-overlay');
  if(!overlay) return;
  overlay.querySelectorAll('.songs-note-wrap, .songs-sticker').forEach(el=>el.remove());
  songState.notes.forEach(songRenderNoteEl);
  songState.stickers.forEach(songRenderStickerEl);
  songRedraw();
}
