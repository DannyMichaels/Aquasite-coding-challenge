class User < ApplicationRecord
  has_secure_password

  validates :username, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true 
  validates :password, length: { minimum: 6 }
  validates_confirmation_of :password

  before_save :downcase_username

  def downcase_username
    self.username.downcase!
  end
end
