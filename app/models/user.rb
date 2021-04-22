class User < ApplicationRecord
  has_secure_password
  validates :username, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true 
  validates :password, length: { minimum: 6 }

end
