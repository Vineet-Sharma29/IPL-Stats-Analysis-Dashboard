const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ipl',
  password: '1234',
  port: 5432,
})

const exp = `
    select 
		Public."Player".player_name as x_label,
      sum(cast(b.batsman_scored as smallint)) as y_label
      from Public."Ball_by_Ball" as b
	  full outer join Public."Player" on b.striker_id = Public."Player".player_id
      where b.batsman_scored != 'Do_nothing' group by Public."Player".player_name order by (y_label) desc;`

const getPlayers = (request, response) => {
  pool.query(exp, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const getByYear = (request, response) =>{
  const queryByYear =  ` 
    select 
    Public."Player".player_name as x_label, 
    sum(cast(b.batsman_scored as smallint)) as y_label
    from Public."Ball_by_Ball" as b
    full outer join Public."Player" on b.striker_id = Public."Player".player_id
    where b.batsman_scored != 'Do_nothing' 
            and 
        b.match_id in 
        ( select mt.match_id 
          from Public."Match" as mt
          where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
        )
    group by Public."Player".player_name 
    order by (y_label) desc;`
  pool.query(queryByYear, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const getCountFour = (request, response) => {
  const queryGetFour = `select 
                        Public."Player".player_name as x_label,
                        count(cast(b.batsman_scored as smallint)) as y_label
                        from Public."Ball_by_Ball" as b
                        full outer join Public."Player" on b.striker_id = Public."Player".player_id
                        where cast(b.batsman_scored as smallint) = 4 and b.batsman_scored != 'Do_nothing'
                        group by Public."Player".player_name 
                        order by y_label desc;`
  pool.query(queryGetFour, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const getCountSix = (request, response) => {
  const queryGetSix = `select 
                        Public."Player".player_name as x_label,
                        count(cast(b.batsman_scored as smallint)) as y_label
                        from Public."Ball_by_Ball" as b
                        full outer join Public."Player" on b.striker_id = Public."Player".player_id
                        where cast(b.batsman_scored as smallint) = 6 and b.batsman_scored != 'Do_nothing'
                        group by Public."Player".player_name 
                        order by y_label desc;`
  pool.query(queryGetSix, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getCountFourYear = (request, response) =>{
  const queryByYear =  ` 
  select 
  Public."Player".player_name as x_label,
    count(cast(b.batsman_scored as smallint)) as y_label
    from Public."Ball_by_Ball" as b
  full outer join Public."Player" on b.striker_id = Public."Player".player_id
    where cast(b.batsman_scored as smallint) = 4 and b.batsman_scored != 'Do_nothing'
            and 
        b.match_id in 
        ( select mt.match_id 
          from Public."Match" as mt
          where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
        )
        group by Public."Player".player_name 
        order by y_label desc;`
  pool.query(queryByYear, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const getCountSixYear = (request, response) =>{
  const queryByYear =  ` 
  select 
  Public."Player".player_name as x_label,
    count(cast(b.batsman_scored as smallint)) as y_label
    from Public."Ball_by_Ball" as b
  full outer join Public."Player" on b.striker_id = Public."Player".player_id
    where cast(b.batsman_scored as smallint) = 6 and b.batsman_scored != 'Do_nothing'
            and 
        b.match_id in 
        ( select mt.match_id 
          from Public."Match" as mt
          where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
        )
        group by Public."Player".player_name 
        order by y_label desc;`
  pool.query(queryByYear, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const getManOfTheMatch = (request, response) =>{
  const queryByMatch =  ` 
    select 
		Public."Player".player_name as x_label,
    count(b.man_of_the_match_id) as y_label
    from Public."Match" as b
	  full outer join Public."Player" on b.man_of_the_match_id = Public."Player".player_id
	  group by Public."Player".player_name 
	  order by y_label desc;`
  pool.query(queryByMatch, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const getManOfTheMatchYear = (request, response) =>{
  const queryByMatch =  ` 
    select 
		Public."Player".player_name as x_label,
    count(b.man_of_the_match_id) as y_label
    from Public."Match" as b
    full outer join Public."Player" on b.man_of_the_match_id = Public."Player".player_id
    where Public."Player".player_name IS NOT NULL
    and 
    b.match_id in 
    ( select mt.match_id 
      from Public."Match" as mt
      where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
    )
	  group by Public."Player".player_name 
	  order by y_label desc;`
  pool.query(queryByMatch, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const successfulTeams = (request, response) =>{
  const queryByTeam =  ` 
    select 
    Public."team".team_name as x_label,
    count(b.match_winner_id) as y_label
    from Public."Match" as b
    full outer join Public."team" on b.match_winner_id = Public."team".team_id
    where Public."team".team_name IS NOT NULL
    group by Public."team".team_name
    order by y_label desc;`
  pool.query(queryByTeam, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const successfulTeamsYear = (request, response) =>{
  const queryByTeam =  ` 
    select 
    Public."team".team_name as x_label,
    count(b.match_winner_id) as y_label
    from Public."Match" as b
    full outer join Public."team" on b.match_winner_id = Public."team".team_id
    where Public."team".team_name IS NOT NULL and
    b.match_id in 
    ( select mt.match_id 
      from Public."Match" as mt
      where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
    )
    group by Public."team".team_name
    order by y_label desc;`
  pool.query(queryByTeam, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const tossTrue = (request, response) =>{
  const queryByToss =  ` 
  select 
	'true' as x_label, 
	count( b.match_winner_id ) filter( where b.match_winner_id = b.toss_winner_id) as y_label 
from Public."Match" as b

union

select 
	'false' as x_label, 
	count( b.match_winner_id ) filter( where b.match_winner_id != b.toss_winner_id) as y_label 
from Public."Match" as b`
  pool.query(queryByToss, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const tossTrueYear = (request, response) =>{
  const queryByToss =  ` 
  select 
	'true' as x_label, 
	count( b.match_winner_id ) filter( where b.match_winner_id = b.toss_winner_id) as y_label 
from Public."Match" as b
where
  b.match_id in 
  ( select mt.match_id 
    from Public."Match" as mt
    where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
  )

union

select 
	'false' as x_label, 
	count( b.match_winner_id ) filter( where b.match_winner_id != b.toss_winner_id) as y_label 
from Public."Match" as b
where
  b.match_id in 
  ( select mt.match_id 
    from Public."Match" as mt
    where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
  )
`
  
  pool.query(queryByToss, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const tossDecision = (request, response) =>{
  const queryByDecision =  ` 
  select b.toss_decision as x_label, 
  count( b.match_winner_id ) filter( where b.match_winner_id = b.toss_winner_id) as y_label
from Public."Match" as b
group by b.toss_decision`
  pool.query(queryByDecision, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const tossDecisionYear = (request, response) =>{
  const queryByDecision =  ` 
  select b.toss_decision as x_label, 
  count( b.match_winner_id ) filter( where b.match_winner_id = b.toss_winner_id) as y_label
from Public."Match" as b
where b.match_id in 
  ( select mt.match_id 
    from Public."Match" as mt
    where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
  )
group by b.toss_decision`
  pool.query(queryByDecision, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const getDots = (request, response) =>{
  const queryByDots =  ` 
  select 
	Public."Player".player_name as x_label,
      count(cast(b.batsman_scored as smallint)) filter( where b.batsman_scored = '0' )  as y_label
      from Public."Ball_by_Ball" as b
	  full outer join Public."Player" on b.bowler_id = Public."Player".player_id
      where b.batsman_scored != 'Do_nothing' 
	  		and b.batsman_scored = '0'
			and b.extra_runs IS NULL
	  group by Public."Player".player_name 
	  order by (y_label) desc;`
  pool.query(queryByDots, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}




const getDotsYear = (request, response) =>{
  const queryByDots =  ` 
  select 
	Public."Player".player_name as x_label,
      count(cast(b.batsman_scored as smallint)) filter( where b.batsman_scored = '0' )  as y_label
      from Public."Ball_by_Ball" as b
	  full outer join Public."Player" on b.bowler_id = Public."Player".player_id
      where b.batsman_scored != 'Do_nothing' 
	  		and b.batsman_scored = '0'
      and b.extra_runs IS NULL
      and b.match_id in 
      ( select mt.match_id 
        from Public."Match" as mt
        where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
      )
	  group by Public."Player".player_name 
	  order by (y_label) desc;`
  pool.query(queryByDots, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getExtra = (request, response) =>{
  const queryByExtras =  ` 
  select 
		Public."Player".player_name as x_label,
      sum(b.extra_runs) as y_label
      from Public."Ball_by_Ball" as b
	  full outer join Public."Player" on b.bowler_id = Public."Player".player_id
      where b.extra_runs is not null
	  group by Public."Player".player_name 
	  order by (y_label) desc;`
  pool.query(queryByExtras, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const getExtraYear = (request, response) =>{
  const queryByExtras =  ` 
  select 
		Public."Player".player_name as x_label,
      sum(b.extra_runs) as y_label
      from Public."Ball_by_Ball" as b
	  full outer join Public."Player" on b.bowler_id = Public."Player".player_id
      where b.extra_runs is not null
      and b.match_id in 
      ( select mt.match_id 
        from Public."Match" as mt
        where mt.match_date > '`+request.body.year+`-1-1' and mt.match_date < '`+request.body.year+`-12-31'
      )
	  group by Public."Player".player_name 
	  order by (y_label) desc;`
  pool.query(queryByExtras, (error, results) =>{
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
}



module.exports = {
  getPlayers,
  getByYear,
  getCountFour,
  getCountSix,
  getCountFourYear,
  getCountSixYear,
  getManOfTheMatch,
  getManOfTheMatchYear,
  successfulTeams,
  successfulTeamsYear,
  tossTrue,
  tossTrueYear,
  tossDecision,
  tossDecisionYear,
  getDots,
  getDotsYear,
  getExtra,
  getExtraYear
}