# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

@user1 = User.create(username: "daniel@email.com", password: "12345678", flow: 12, pressure: 10)
@user2 = User.create(username: "bob@email.com", password: "12345678", flow: 11, pressure: 8)

puts "#{User.count} users created!"